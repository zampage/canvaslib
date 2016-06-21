/*
*	(c) JavaScript Library mclib created by Markus Chiarot
*/

mclib = window.mclib || {};
mclib = (function(){

	function StageFactory(canvas){

		if(!canvas){
			console.log(canvas);
			throw 'CanvasNotFoundError';
		}

		if(canvas instanceof jQuery){
			canvas = canvas.get(0);
		}

		return new mclib.Stage(
			canvas,
			canvas.id || '',
			canvas.className.split(' '),
			canvas.getContext('2d')
		);

	}

	function PropertyFactory(def, custom){

		var properties = def || {};
		var custom = custom || {};
		for (var prop in custom) {
			if (custom.hasOwnProperty(prop) && def.hasOwnProperty(prop)) {
				properties[prop] = custom[prop];
			}
		}
		return properties;

	}

	function RectFactory(args){

		var properties = PropertyFactory({
			x: 0,
			y: 0,
			width: 10,
			height: 10,
			color: '#000000',
		}, args);

		return new mclib.Rect(
			properties.x,
			properties.y,
			properties.width,
			properties.height,
			properties.color
		);

	}

	function CircleFactory(args) {

		var properties = PropertyFactory({
			x: 0,
			y: 0,
			r: 5,
			color: '#000000',
		}, args);

		return new mclib.Circle(
			properties.x,
			properties.y,
			properties.r,
			properties.color
		)

	}

	return {

		createStage : function(canvas){
			return StageFactory(canvas);
		},

		createRect : function(args) {
			return RectFactory(args);
		},

		createCircle : function(args){
			return CircleFactory(args);
		},

		Stage : function(dom, id, classes, ctx){

			this.dom = dom;
			this.id = id;
			this.classes = classes;
			this.content = [];
			this.ctx = ctx;
			this.addChild = function(child){
				this.content.push(child);
				child.stage = this;
				child.paint();
			};
			var that = this;
			this.dom.addEventListener('click', function(evt){
				var x = evt.pageX - evt.target.offsetLeft;
				var y = evt.pageY - evt.target.offsetTop;
				var max = that.content.length;
				for(var i = 0; i < max; i++){
					var item = that.content[i];
					(item.collide(x, y) && typeof item.onclick == 'function') ? item.onclick(evt) : null;
				}

			});

		},

		Rect : function(x, y, w, h, c, ds){

			this.x = x;
			this.y = y;
			this.width = w;
			this.height = h;
			this.color = c;
			this.drawStyle = ds;
			this.stage = null;
			this.paint = function(){
				var ctx = this.stage.ctx;
				ctx.beginPath();
				ctx.fillStyle = this.color;
				ctx.strokeStyle = this.color;
				ctx.rect(this.x, this.y, this.width, this.height);
				(typeof this.onbeforedraw == 'function') ? this.onbeforedraw(ctx) : null;
				(this.drawStyle == 'stroke') ? ctx.stroke() : ctx.fill();
			};
			this.collide = function(x, y, spread){
				spread = spread | 0;
				return ((x > this.x - spread && x < this.x + this.width + spread) && (y > this.y - spread && y < this.y + this.height + spread)) ? true : false;
			};
			this.collideItem = function(item, spread){
				var cornerA = item.collide(this.x, this.y, spread);
				var cornerB = item.collide(this.x + this.width, this.y, spread);
				var cornerC = item.collide(this.x + this.width, this.y + this.height, spread);
				var cornerD = item.collide(this.x, this.y + this.height, spread);
				return (cornerA || cornerB || cornerC || cornerD) ? true : false;
			};
			this.move = function(x, y){
				this.stage.ctx.clearRect(this.x - 1, this.y - 1, this.width + 1, this.height + 1);
				var idx = this.stage.content.indexOf(this);
				this.stage.content.splice(idx, 1);
				var max = this.stage.content.length;
				for(var i = 0; i < max; i++){
					var item = this.stage.content[i];
					if(this.collideItem(item, 1)){
						console.log("collision between items");
						item.paint();
					}
				}
				this.stage.content.splice(idx, 0, this);

				this.x = x;
				this.y = y;
				this.paint();
			};

		},

		Circle : function(x, y, r, c, ds){

			this.x = x;
			this.y = y;
			this.r = r;
			this.color = c;
			this.drawStyle = ds;
			this.stage = null;
			this.paint = function(){
				var ctx = this.stage.ctx;
				ctx.fillStyle = this.color;
				ctx.strokeStyle = this.color;
				ctx.beginPath();
				ctx.arc(this.x ,this.y, this.r, 0, 2*Math.PI);
				(typeof this.onbeforedraw == 'function') ? this.onbeforedraw(ctx) : null;
				(this.drawStyle == 'stroke') ? ctx.stroke() : ctx.fill();
			};
			this.collide = function(x, y, spread){
				spread = spread | 0;
				return ((x > (this.x - this.r - spread) && x < (this.x + this.r + spread)) && (y > (this.y - this.r - spread) && y < (this.y + this.r + spread))) ? true : false;
			};
			this.collideItem = function(item, spread){
				var cornerA = item.collide(this.x - this.r, this.y - this.r, spread);
				var cornerB = item.collide(this.x + this.r, this.y - this.r, spread);
				var cornerC = item.collide(this.x + this.r, this.y + this.r, spread);
				var cornerD = item.collide(this.x - this.r, this.y + this.r, spread);
				return (cornerA || cornerB || cornerC || cornerD) ? true : false;
			};
			this.move = function(x, y){
				this.stage.ctx.clearRect(this.x - this.r - 1, this.y - this.r - 1, this.r*2 + 1, this.r*2 + 1);
				var idx = this.stage.content.indexOf(this);
				this.stage.content.splice(idx, 1);
				var max = this.stage.content.length;
				for(var i = 0; i < max; i++){
					var item = this.stage.content[i];
					if(this.collideItem(item, 1)){
						console.log("collision between items");
						item.paint();
					}
				}
				this.stage.content.splice(idx, 0, this);

				this.x = x;
				this.y = y;
				this.paint();
			};


		},

	}

})();