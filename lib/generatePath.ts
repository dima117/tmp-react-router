import pathToRegexp, { PathFunction } from 'path-to-regexp';

const cache: { [key: string]: PathFunction<object> } = {};
const cacheLimit = 10000;
let cacheCount = 0;

function compilePath(path: string): PathFunction<object> {
    if (cache[path]) return cache[path];

    const generator: PathFunction<object> = pathToRegexp.compile(path);

    if (cacheCount < cacheLimit) {
        cache[path] = generator;
        cacheCount++;
    }

    return generator;
}

/**
 * Public API for generating a URL pathname from a path and parameters.
 */
export function generatePath(path: string = '/', params: object = {}): string {
    return path === '/' ? path : compilePath(path)(params);
}
