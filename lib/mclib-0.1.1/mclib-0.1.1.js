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
				child.paint(this.ctx);
			}

		},

		Rect : function(x, y, w, h, c, ds){

			this.x = x;
			this.y = y;
			this.w = w;
			this.h = h;
			this.color = c;
			this.drawStyle = ds;
			this.stage = null;
			this.paint = function(ctx){
				ctx.fillStyle = this.color;
				ctx.strokeStyle = this.color;
				ctx.rect(this.x, this.x, this.w, this.h);
				(typeof this.onbeforedraw == 'function') ? this.onbeforedraw(ctx) : null;
				(this.drawStyle == 'stroke') ? ctx.stroke() : ctx.fill();
			}

		},

		Circle : function(x, y, r, c, ds){

			this.x = x;
			this.y = y;
			this.r = r;
			this.color = c;
			this.drawStyle = ds;
			this.stage = null;
			this.paint = function(ctx){
				ctx.fillStyle = this.color;
				ctx.strokeStyle = this.color;
				ctx.beginPath();
				ctx.arc(this.x ,this.y, this.r, 0, 2*Math.PI);
				(this.drawStyle == 'stroke') ? ctx.stroke() : ctx.fill();
			}

		},

	}

})();