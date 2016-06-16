describe('basic tests', function(){
	
	it('library is defined', function(){
		expect(mclib).toEqual(jasmine.any(Object));
	})

	it('library can be loaded', function(){
		expect(mclib.isLoaded).toEqual(true);
	})

});