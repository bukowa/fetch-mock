const builtInMatchers = require('./built-in-matchers');

const { debug, setDebugNamespace, getDebug } = require('../lib/debug');

const isUrlMatcher = (matcher) =>
	matcher instanceof RegExp ||
	typeof matcher === 'string' ||
	(typeof matcher === 'object' && 'href' in matcher);

const isFunctionMatcher = (matcher) => typeof matcher === 'function';

class Route {
	constructor(args, fetchMock) {
		this.fetchMock = fetchMock;
		const debug = getDebug('compileRoute()');
		debug('Compiling route');
		this.interpretArgs(args);
		this.validate();
		this.generateMatcher();
		this.limit();
		this.delayResponse();
	}

	validate() {
		if (!('response' in this)) {
			throw new Error('fetch-mock: Each route must define a response');
		}

		if (!Route.registeredMatchers.some(({ name }) => name in this)) {
			throw new Error(
				"fetch-mock: Each route must specify some criteria for matching calls to fetch. To match all calls use '*'"
			);
		}
	}

	interpretArgs(args) {
		const debug = getDebug('sanitize()');
		const [matcher, response, options = {}] = args;

		const routeConfig = {...options};

		if (isUrlMatcher(matcher) || isFunctionMatcher(matcher)) {
			routeConfig.matcher = matcher;
		} else {
			Object.assign(routeConfig, matcher);
		}

		if (typeof response !== 'undefined') {
			routeConfig.response = response;
		}

		if (isUrlMatcher(routeConfig.matcher)) {
			debug('Mock uses a url matcher', routeConfig.matcher);
			routeConfig.url = routeConfig.matcher;
		} else {
			routeConfig.functionMatcher = routeConfig.matcher
		}

		delete routeConfig.matcher;

		debug('Sanitizing route properties');

		if (routeConfig.method) {
			debug(`Converting method ${routeConfig.method} to lower case`);
			routeConfig.method = routeConfig.method.toLowerCase();
		}

		debug('Setting route.identifier...');
		debug(`  route.name is ${routeConfig.name}`);
		debug(`  route.url is ${routeConfig.url}`);
		debug(`  route.functionMatcher is ${routeConfig.functionMatcher}`);
		routeConfig.identifier = routeConfig.name || routeConfig.url || routeConfig.functionMatcher;
		debug(`  -> route.identifier set to ${routeConfig.identifier}`);
		Object.assign(this, routeConfig);
	}

	generateMatcher() {
		setDebugNamespace('generateMatcher()');
		debug('Compiling matcher for route');

		const activeMatchers = Route.registeredMatchers
			.map(
				({ name, matcher, usesBody }) =>
					this[name] && { matcher: matcher(this, this.fetchMock), usesBody }
			)
			.filter((matcher) => Boolean(matcher));

		this.usesBody = activeMatchers.some(({ usesBody }) => usesBody);

		debug('Compiled matcher for route');
		setDebugNamespace();
		this.matcher = (url, options = {}, request) =>
			activeMatchers.every(({ matcher }) => matcher(url, options, request));
	}

	limit() {
		const debug = getDebug('limit()');
		debug('Limiting number of requests to handle by route');
		if (!this.repeat) {
			debug(
				'  No `repeat` value set on route. Will match any number of requests'
			);
			return;
		}

		debug(`  Route set to repeat ${this.repeat} times`);
		const matcher = this.matcher;
		let timesLeft = this.repeat;
		this.matcher = (url, options) => {
			const match = timesLeft && matcher(url, options);
			if (match) {
				timesLeft--;
				return true;
			}
		};
		this.reset = () => (timesLeft = this.repeat);
	}

	delayResponse() {
		const debug = getDebug('delayResponse()');
		debug(`Applying response delay settings`);
		if (this.delay) {
			debug(`  Wrapping response in delay of ${this.delay} miliseconds`);
			const response = this.response;
			this.response = () => {
				debug(`Delaying response by ${this.delay} miliseconds`);
				return new Promise((res) =>
					setTimeout(() => res(response), this.delay)
				);
			};
		} else {
			debug(
				`  No delay set on route. Will respond 'immediately' (but asynchronously)`
			);
		}
	}

	static addMatcher(matcher) {
		Route.registeredMatchers.push(matcher);
	}
}

Route.registeredMatchers = [];

builtInMatchers.forEach(Route.addMatcher);

module.exports = Route;
