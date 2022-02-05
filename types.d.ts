declare module "powercord" {
    export const injector: typeof import("powercord/injector");

    export const Entities: typeof import("powercord/entities");

    export const util: typeof import("powercord/util");

    export const webpack: typeof import("powercord/webpack");
}

declare module "powercord/injector" {
    export function uninject(caller: string): void;
    export function inject(caller: string, module: any, functionName: string, callback: <T>(args: any[], res: T) => T, pre?: boolean): void;
}

declare module "powercord/entities" {
    export class Plugin {
        public readonly entityID: string;

        public error(...message: any[]): void;
    }
}

declare module "powercord/util" {
    export function wrapInHooks<T extends React.ReactElement<any, any>, C extends React.FC>(functionalComponent: C): () => T;
    export function findInReactTree<T extends unknown>(tree: any, filter: (layer: any) => boolean): T;
}

declare module "powercord/webpack" {
    export const React: typeof import("react");
    export function getModuleByDisplayName<T extends React.FC, W extends boolean>(displayName: string, wait?: W):
        W extends true ? Promise<T> : T;
}