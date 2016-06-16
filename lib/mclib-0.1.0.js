/*
*	(c) JavaScript Library mclib created by Markus Chiarot
*/

mclib = window.mclib || {};
mclib = (function(){

	/*
	*
	* PRIVATE VARIABLES
	*
	* var privateVal = 'priv';
	*
	*/

	/*
	*
	* PRIVATE FUNCTIONS
	*
	* function doPrivate(){
	*	console.log(privateVal);
	* }
	*
	*/

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

	function RectFactory(args){

		var defaultArgs = {
			x: 0,
			y: 0,
			width: 1,
			height: 1,
			color: '#000000',
		};

		var newargs = defaultArgs;

		for (var prop in args) {
			if (args.hasOwnProperty(prop) && defaultArgs.hasOwnProperty(prop)) {
				newargs[prop] = args[prop];
			}
		}

		return new mclib.Rect(
			newargs.x,
			newargs.y,
			newargs.width,
			newargs.height,
			newargs.color
		);

	}

	return {

		/*
		*
		* PUBLIC VARIABLES
		*
		* publicVal : 'publ',
		*
		*/

		isLoaded : true,
		
		/*
		*
		* PUBLIC FUNCTIONS
		*
		* doPublic : function(){
		*	console.log(mclib.publicVal);
		* }, 
		*
		* getPrivate : function(){
		*	console.log(privval);
		* },
		*
		*/

		createStage : function(canvas){

			return StageFactory(canvas);

		},

		createRect : function(args) {

			return RectFactory(args);

		},

		Stage : function(dom, id, classes, ctx){
			this.dom = dom;
			this.id = id;
			this.classes = classes;
			this.content = [];
			this.ctx = ctx;
			this.addChild = function(child){
				this.content.push(child);
				child.paint(this.ctx);
			}
		},

		Rect : function(x, y, w, h, c){
			this.x = x;
			this.y = y;
			this.w = w;
			this.h = h;
			this.color = c;
			this.paint = function(ctx){
				ctx.fillStyle = this.color;
				ctx.fillRect(this.x, this.y, this.w, this.h);
			}
		},

	}

})();