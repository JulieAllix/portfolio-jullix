export class CancellablePromise<T> {

    private _isCancelled: boolean = false;
    private _isFinished: boolean = false;

    private readonly timeout: number;

    private beforeStart?: (...args: any[]) => any;
    private afterStart?: (...args: any[]) => any;

    private promiseArgs: any[];

    constructor(
        private promiseGenerator: (...args: any[]) => Promise<T>,
        promiseArgs: any[] = [],
        timeout: number = 800
    ) {
        this.promiseArgs = promiseArgs;
        this.timeout = timeout;
    }

    get isCancelled(): boolean {
        return this._isCancelled;
    }

    get isFinished(): boolean {
        return this._isFinished;
    }

    $beforeStart(cb: (...args: any[]) => any) {
        this.beforeStart = cb.bind(this);
        return this;
    }

    $afterStart(cb: (...args: any[]) => any) {
        this.afterStart = cb.bind(this);
        return this;
    }

    then<R>(cb: (res: T) => R): Promise<R> {
        this.beforeStart?.();
        if (this.isCancelled) {
            return Promise.reject('cancelled before start');
        } else {
            const res = new Promise<R>((resolve, reject) => {
                const tm = setTimeout(() => {
                    if (this.isCancelled) {
                        reject('cancelled before timeout')
                    } else {
                        const finalResult = this.promiseGenerator(...this.promiseArgs).then(res => {
                            this._isFinished = true;
                            if (this.isCancelled)
                                return Promise.reject('cancelled after');
                            return cb(res);
                        });
                        resolve(finalResult);
                    }
                }, this.timeout);
                if (this.isCancelled) {
                    clearTimeout(tm);
                    reject('cancelled before start');
                }
            })
            this.afterStart?.();
            return res;
        }
    }

    cancel() {
        this._isCancelled = true;
    }
}
