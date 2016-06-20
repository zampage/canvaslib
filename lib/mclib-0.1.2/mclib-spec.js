beforeAll(function(){
	var canvas = document.createElement('canvas');
	canvas.id = 'my-canvas';
	canvas.className = 'testclass helloworld';
	document.body.appendChild(canvas);
})

afterAll(function(){
	var canvas = document.getElementById('my-canvas');
	var parent = canvas.parentNode;
	parent.removeChild(canvas);
})

describe('stage tests', function(){

	it('create a stage by JS', function(){
		expect(mclib.createStage(document.getElementById('my-canvas'))).toEqual(jasmine.any(mclib.Stage));
	})

	it('create a stage by jQuery', function(){
		expect(mclib.createStage($('#my-canvas'))).toEqual(jasmine.any(mclib.Stage));
	})

	it('get classes array count from stage', function(){
		var stage = mclib.createStage($('#my-canvas'));
		expect(stage.classes.length).toBe(2);
	})

	it('get class from stage', function(){
		var stage = mclib.createStage($('#my-canvas'));
		expect(stage.classes[0]).toEqual('testclass');
	})

	it('add a child to a stage', function(){
		var stage = mclib.createStage($('#my-canvas'));
		var rect = mclib.createRect({});
		stage.addChild(rect);
		expect(stage.content[0]).toBe(rect);
	})

})

describe('figure tests', function(){

	describe('rect', function(){

		it('create a rectangle', function(){
			expect(mclib.createRect({})).toEqual(jasmine.any(mclib.Rect));
		})

		it('create a rectangle with overriden defaults', function(){
			var defaultRect = mclib.createRect();
			var rect = mclib.createRect({color:'#FF9900'});
			expect(rect.color).not.toBe(defaultRect.color);
		})

	})

	describe('circle', function() {

		it('create a circle', function () {
			expect(mclib.createCircle({})).toEqual(jasmine.any(mclib.Circle));
		})

		it('create a circle with overriden defaults', function () {
			var defaultCircle = mclib.createCircle();
			var circle = mclib.createCircle({r: 50});
			expect(circle.r).not.toBe(defaultCircle.r);
		})

	})

})

describe('event tests', function(){

	it('click', function(){
		/*
		var stage = mclib.createStage($('#my-canvas'));
		var rect = mclib.createRect({width:10, height:10});
		var wasclicked = false;
		rect.onclick = function(){
			wasclicked = true;
		}
		stage.addChild(rect);

		document.addEventListener('click', function(evt){
			console.log(evt);
		});

		var evt = $.Event('click', {pageX: 5, pageY: 5});
		$('#my-canvas').trigger(evt);

		expect(wasclicked).toEqual(true);
		*/
	})

})