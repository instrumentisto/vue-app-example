interface System {
    import<T>(module: string): Promise<T>;
}

declare const System: System;
