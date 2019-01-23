import { Location as HistoryLocation } from 'history';
import { parse } from 'qs';

import { matchPath } from './matchPath';

export const UNKNOWN_PATH = '@@xxx/UNKNOWN_PATH';

export interface RouterConfig {
    routes: { [key: string]: string | string[] };
    // todo: basePath
}

export interface RouterLocation {
    pathname: string;
    search: string;
    hash: string;
    key: string;
    params: object;
    query: object;
}

export function parseLocation({ routes }: RouterConfig, { pathname, search, hash }: HistoryLocation): RouterLocation {
    const query = parse(search);

    let location: RouterLocation | null = Object.keys(routes)
        .reduce((prev: RouterLocation | null, key: string) => {
            if (prev) {
                return prev;
            }

            const matched = matchPath(pathname, {
                path: routes[key]
            });

            return matched ? {
                pathname, 
                search, 
                hash,
                key,
                params: matched.params,
                query
            } : null;
        }, null);

    return location || {
        pathname, 
        search, 
        hash,
        key: UNKNOWN_PATH,
        params: {},
        query
    };
}
