import {ApiInterface} from '../api';
import {Roles} from '../types/bases/Roles';

export namespace Api {
    export type Class<T> = new (...args: any) => T;

    export type GeneratorT<
        T extends string,
        Last extends 'body' | 'returned' | 'method',
    > = T extends `/${infer Root}/${infer Controller}/${infer EndPoint}`
        ? Root extends keyof ApiInterface
            ? Controller extends keyof ApiInterface[Root]
                ? EndPoint extends keyof ApiInterface[Root][Controller]
                    ? Last extends keyof ApiInterface[Root][Controller][EndPoint]
                        ? ApiInterface[Root][Controller][EndPoint][Last]
                        : never
                    : never
                : never
            : never
        : never;

    export type Returned<Path extends FullRoutes> = ReturnedB<Path>;
    export type BodyT<Path extends FullRoutes> = BodyB<Path>;

    export type BodyB<Path extends string> = GeneratorT<`${Path}`, 'body'>;
    export type ReturnedB<Path extends string> = GeneratorT<`${Path}`, 'returned'>;

    export type ClassGenerator<T extends AllControllers> = {
        [K in Endpoints<T>]: (
            body: BodyB<`/api/${T}/${K}`>,
            ...args: any[]
        ) => Promise<ReturnedB<`/api/${T}/${K}`>> | ReturnedB<`/api/${T}/${K}`>;
    };

    export type FullControllersSelectors = {
        [K in FullRoutes]: K extends `/${infer Root}/${infer Controller}/${string}`
            ? `/${Root}/${Controller}/*`
            : never;
    }[FullRoutes];

    export type Permissions = {
        [K in Roles]?: (FullRoutes | FullControllersSelectors)[];
    };

    export type FormatRoute<T> = T extends `${infer A}/${infer B}`
        ? T extends `${infer C}/:${infer D}`
            ? `${Lowercase<C>}${Capitalize<D>}`
            : `${A}_${B}`
        : T extends `${infer Total}`
        ? Total
        : never;

    export type FormatGenerator<T> = {
        [K in keyof T as FormatRoute<K>]: T[K];
    };

    export type ControllerGenerator<T extends AllControllers> = FormatGenerator<ClassGenerator<T>>;

    export type FlattenRoute<T> = {
        [K in keyof T]: {
            [L in keyof T[K]]: {
                [M in keyof T[K][L]]: K extends string
                    ? L extends string
                        ? M extends string
                            ? `/${K}/${L}/${M}`
                            : never
                        : never
                    : never;
            }[keyof T[K][L]];
        }[keyof T[K]];
    }[keyof T];

    export type FullRoutes = FlattenRoute<ApiInterface>;

    export type ServiceGenerator<S extends AllControllers> = {
        [K in Endpoints<S>]: (body: BodyB<`/api/${S}/${K}`>) => Promise<ReturnedB<`/api/${S}/${K}`>>;
    };

    export type DeepProperty<T> = {
        [K in keyof T]: T[K] extends object ? K : never;
    }[keyof T];

    export type DeepProperty2<T> = {
        [K in keyof T]: T[K] extends object ? DeepProperty<T[K]> : never;
    }[keyof T];

    export type AllControllers = DeepProperty2<ApiInterface>;

    export type Endpoints<Controller extends string> = {
        [R in FullRoutes]: R extends `/${string}/${Controller}/${infer Endpoint}` ? Endpoint : never;
    }[FullRoutes];
}
