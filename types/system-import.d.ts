interface ISystem {
    import<T>(module: string): Promise<T>;
}

declare const System: ISystem;
