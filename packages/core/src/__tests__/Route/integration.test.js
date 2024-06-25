it('match using custom function with Request', () => {
	const route = new Route({
		matcher: (url, options) => {
			console.log(url, options);
			return url.indexOf('logged-in') > -1 && options.headers.authorized;
		},
		response: 200,
	});

	expect(
		route.matcher(
			new Request('http://a.com/logged-in', {
				headers: { authorized: 'true' },
			}),
		),
	).toBe(true);
});

it('match using custom function with Request with unusual options', () => {
	// as node-fetch does not try to emulate all the WHATWG standards, we can't check for the
	// same properties in the browser and nodejs
	const propertyToCheck = new Request('http://example.com').cache
		? 'credentials'
		: 'compress';
	const valueToSet = propertyToCheck === 'credentials' ? 'include' : false;

	const route = new Route({
		matcher: (url, options, request) => request[propertyToCheck] === valueToSet,
		response: 200,
	});

	expect(route.matcher(new Request('http://a.com/logged-in'))).toBe(false);
	expect(
		route.matcher(
			new Request('http://a.com/logged-in', {
				[propertyToCheck]: valueToSet,
			}),
		),
	).toBe(true);
});

it.skip('match custom Headers instance', async () => {
	const customHeaderInstance = fm.createInstance();
	customHeaderInstance.config.Headers = class {
		constructor(obj) {
			this.obj = obj;
		}

		*[Symbol.iterator]() {
			yield ['a', 'b'];
		}

		has() {
			return true;
		}
	};

	customHeaderInstance
		.route(
			{
				headers: { a: 'b' },
				,
				response: 200
			},
		)


	await customHeaderInstance.fetchHandler('http://a.com/', {
		headers: new customHeaderInstance.config.Headers({ a: 'b' }),
	});
	expect(customHeaderInstance.calls(true).length).toEqual(1);
});