describe('basic tests', function(){
	
	it('library is defined', function(){
		expect(mclib).toEqual(jasmine.any(Object));
	})

	it('library can be loaded', function(){
		expect(mclib.isLoaded).toEqual(true);
	})

});

describe('canvas tests', function(){
	
	it('create a stage by JS', function(){
		expect(mclib.createStage(document.getElementById('my-canvas'))).toEqual(jasmine.any(mclib.Stage));
	})

	it('create a stage by jQuery', function(){
		expect(mclib.createStage($('#my-canvas'))).toEqual(jasmine.any(mclib.Stage));
	})

	it('create a rectangle', function(){
		expect(mclib.createRect({})).toEqual(jasmine.any(mclib.Rect));
	})

	it('create a rectangle with overriden defaults', function(){
		var defaultRect = mclib.createRect({});
		var rect = mclib.createRect({color:'#FF9900'});
		expect(rect.color).not.toBe(defaultRect.color);
	})

	it('add a child to a stage', function(){
		var stage = mclib.createStage($('#my-canvas'));
		var rect = mclib.createRect({});
		stage.addChild(rect);
		expect(stage.content[0]).toBe(rect);
	})
	
})