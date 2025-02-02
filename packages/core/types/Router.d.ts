

interface RouteOptionsMethodGet extends RouteOptions {
    method?: 'GET';
}

interface RouteOptionsMethodPost extends RouteOptions {
    method?: 'POST';
}

interface RouteOptionsMethodPut extends RouteOptions {
    method?: 'PUT';
}

interface RouteOptionsMethodDelete extends RouteOptions {
    method?: 'DELETE';
}

interface RouteOptionsMethodPatch extends RouteOptions {
    method?: 'PATCH';
}

interface RouteOptionsMethodHead extends RouteOptions {
    method?: 'HEAD';
}

interface Router {

/**
 * Replaces fetch() with a stub which records its calls, grouped by
 * route, and optionally returns a mocked Response object or passes the
 *  call through to fetch(). Calls to .mock() can be chained.
 * @param matcher Condition for selecting which requests to mock
 * @param response Configures the http response returned by the mock
 * @param [options] Additional properties defining the route to mock
 */
route(matcher: RouteMatcher | RouteOptions, response: MockResponse | MockResponseFunction, options ?: RouteOptions): this;

/**
 * Replaces fetch() with a stub which records its calls, grouped by
 * route, and optionally returns a mocked Response object or passes the
 *  call through to fetch(). Calls to .mock() can be chained.
 * @param options The route to mock
 */
route(options: RouteOptions): this;

/**
 * Replaces fetch() with a stub which records its calls, grouped by
 * route, and optionally returns a mocked Response object or passes the
 *  call through to fetch(). Shorthand forroute() which creates a route
 *  that persists even when restore(), reset() or resetbehavior() are called.
 *  Calls to .sticky() can be chained.
 * @param matcher Condition for selecting which requests to mock
 * @param response Configures the http response returned by the mock
 * @param [options] Additional properties defining the route to mock
 */
sticky(matcher: RouteMatcher | RouteOptions, response: MockResponse | MockResponseFunction, options ?: RouteOptions): this;

/**
 * Replaces fetch() with a stub which records its calls, grouped by
 * route, and optionally returns a mocked Response object or passes the
 *  call through to fetch(). Shorthand forroute() limited to being
 *  called one time only. Calls to .once() can be chained.
 * @param matcher Condition for selecting which requests to mock
 * @param response Configures the http response returned by the mock
 * @param [options] Optional additional properties defining the route to mock
 */
once(matcher: RouteMatcher | RouteOptions, response: MockResponse | MockResponseFunction, options ?: RouteOptions): this;

/**
 * Replaces fetch() with a stub which records its calls, grouped by
 * route, and optionally returns a mocked Response object or passes the
 *  call through to fetch(). Shorthand forroute() restricted to the GET
 *  method. Calls to .get() can be chained.
 * @param matcher Condition for selecting which requests to mock
 * @param response Configures the http response returned by the mock
 * @param [options] Additional properties defining the route to mock
 */
get(matcher: RouteMatcher | RouteOptionsMethodGet, response: MockResponse | MockResponseFunction, options ?: RouteOptionsMethodGet): this;

/**
 * Replaces fetch() with a stub which records its calls, grouped by
 * route, and optionally returns a mocked Response object or passes the
 *  call through to fetch(). Shorthand forroute() restricted to the GET
 *  method and limited to being called one time only. Calls to .getOnce()
 *  can be chained.
 * @param matcher Condition for selecting which requests to mock
 * @param response Configures the http response returned by the mock
 * @param [options] Additional properties defining the route to mock
 */
getOnce(matcher: RouteMatcher | RouteOptionsMethodGet, response: MockResponse | MockResponseFunction, options ?: RouteOptionsMethodGet): this;

/**
 * Replaces fetch() with a stub which records its calls, grouped by
 * route, and optionally returns a mocked Response object or passes the
 *  call through to fetch(). Shorthand forroute() restricted to the POST
 *  method. Calls to .post() can be chained.
 * @param matcher Condition for selecting which requests to mock
 * @param response Configures the http response returned by the mock
 * @param [options] Additional properties defining the route to mock
 */
post(matcher: RouteMatcher | RouteOptionsMethodPost, response: MockResponse | MockResponseFunction, options ?: RouteOptionsMethodPost): this;

/**
 * Replaces fetch() with a stub which records its calls, grouped by
 * route, and optionally returns a mocked Response object or passes the
 *  call through to fetch(). Shorthand forroute() restricted to the POST
 *  method and limited to being called one time only. Calls to .postOnce()
 *  can be chained.
 * @param matcher Condition for selecting which requests to mock
 * @param response Configures the http response returned by the mock
 * @param [options] Additional properties defining the route to mock
 */
postOnce(matcher: RouteMatcher | RouteOptionsMethodPost, response: MockResponse | MockResponseFunction, options ?: RouteOptionsMethodPost): this;

/**
 * Replaces fetch() with a stub which records its calls, grouped by
 * route, and optionally returns a mocked Response object or passes the
 *  call through to fetch(). Shorthand forroute() restricted to the PUT
 *  method. Calls to .put() can be chained.
 * @param matcher Condition for selecting which requests to mock
 * @param response Configures the http response returned by the mock
 * @param [options] Additional properties defining the route to mock
 */
put(matcher: RouteMatcher | RouteOptionsMethodPut, response: MockResponse | MockResponseFunction, options ?: RouteOptionsMethodPut): this;

/**
 * Replaces fetch() with a stub which records its calls, grouped by
 * route, and optionally returns a mocked Response object or passes the
 *  call through to fetch(). Shorthand forroute() restricted to the PUT
 *  method and limited to being called one time only. Calls to .putOnce()
 *  can be chained.
 * @param matcher Condition for selecting which requests to mock
 * @param response Configures the http response returned by the mock
 * @param [options] Additional properties defining the route to mock
 */
putOnce(matcher: RouteMatcher | RouteOptionsMethodPut, response: MockResponse | MockResponseFunction, options ?: RouteOptionsMethodPut): this;

/**
 * Replaces fetch() with a stub which records its calls, grouped by
 * route, and optionally returns a mocked Response object or passes the
 *  call through to fetch(). Shorthand forroute() restricted to the
 *  DELETE method. Calls to .delete() can be chained.
 * @param matcher Condition for selecting which requests to mock
 * @param response Configures the http response returned by the mock
 * @param [options] Additional properties defining the route to mock
 */
delete (matcher: RouteMatcher | RouteOptionsMethodDelete, response: MockResponse | MockResponseFunction, options ?: RouteOptionsMethodDelete): this;

/**
 * Replaces fetch() with a stub which records its calls, grouped by
 * route, and optionally returns a mocked Response object or passes the
 *  call through to fetch(). Shorthand forroute() restricted to the
 *  DELETE method and limited to being called one time only. Calls to
 *  .deleteOnce() can be chained.
 * @param matcher Condition for selecting which requests to mock
 * @param response Configures the http response returned by the mock
 * @param [options] Additional properties defining the route to mock
 */
deleteOnce(matcher: RouteMatcher | RouteOptionsMethodDelete, response: MockResponse | MockResponseFunction, options ?: RouteOptionsMethodDelete): this;

/**
 * Replaces fetch() with a stub which records its calls, grouped by
 * route, and optionally returns a mocked Response object or passes the
 *  call through to fetch(). Shorthand forroute() restricted to the HEAD
 *  method. Calls to .head() can be chained.
 * @param matcher Condition for selecting which requests to mock
 * @param response Configures the http response returned by the mock
 * @param [options] Additional properties defining the route to mock
 */
head(matcher: RouteMatcher | RouteOptionsMethodHead, response: MockResponse | MockResponseFunction, options ?: RouteOptionsMethodHead): this;

/**
 * Replaces fetch() with a stub which records its calls, grouped by
 * route, and optionally returns a mocked Response object or passes the
 *  call through to fetch(). Shorthand forroute() restricted to the HEAD
 *  method and limited to being called one time only. Calls to .headOnce()
 *  can be chained.
 * @param matcher Condition for selecting which requests to mock
 * @param response Configures the http response returned by the mock
 * @param [options] Additional properties defining the route to mock
 */
headOnce(matcher: RouteMatcher | RouteOptionsMethodHead, response: MockResponse | MockResponseFunction, options ?: RouteOptionsMethodHead): this;

/**
 * Replaces fetch() with a stub which records its calls, grouped by
 * route, and optionally returns a mocked Response object or passes the
 *  call through to fetch(). Shorthand forroute() restricted to the PATCH
 *  method. Calls to .patch() can be chained.
 * @param matcher Condition for selecting which requests to mock
 * @param response Configures the http response returned by the mock
 * @param [options] Additional properties defining the route to mock
 */
patch(matcher: RouteMatcher | RouteOptionsMethodPatch, response: MockResponse | MockResponseFunction, options ?: RouteOptionsMethodPatch): this;

/**
 * Replaces fetch() with a stub which records its calls, grouped by
 * route, and optionally returns a mocked Response object or passes the
 *  call through to fetch(). Shorthand forroute() restricted to the PATCH
 *  method and limited to being called one time only. Calls to .patchOnce()
 *  can be chained.
 * @param matcher Condition for selecting which requests to mock
 * @param response Configures the http response returned by the mock
 * @param [options] Additional properties defining the route to mock
 */
patchOnce(matcher: RouteMatcher | RouteOptionsMethodPatch, response: MockResponse | MockResponseFunction, options ?: RouteOptionsMethodPatch): this;

    /**
     * Chainable method that defines how to respond to calls to fetch that
     * don't match any of the defined mocks. It accepts the same types of
     * response as a normal call to .mock(matcher, response). It can also
     * take an arbitrary function to completely customise behaviour of
     * unmatched calls. If .catch() is called without any parameters then
     * every unmatched call will receive a 200 response.
     * @param [response] Configures the http response returned by the mock
     */
    catch (response?: MockResponse | MockResponseFunction): this;

}
