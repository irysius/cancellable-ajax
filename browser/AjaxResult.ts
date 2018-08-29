interface IOptions {
	url: string;
	init?: RequestInit;
}

class AjaxResult {
	cancel: () => void;
	then: (callback: (value?: any) => void) => Promise<any>;
	catch: (callback: (error?: any) => void) => Promise<any>;
	finally: (callback: () => void) => Promise<any>;

	constructor(options: IOptions) {
		let { url, init = {} } = options;
		let controller = new AbortController();
		let _init = {
			...init,
			signal: controller.signal
		};
		let p = new Promise((resolve, reject) => {
			fetch(url, _init).then(response => {
				resolve(response.json());
			}, error => {
				reject(error);
			});
		});
		this.cancel = controller.abort.bind(controller);
		this.then = p.then.bind(p);
		this.catch = p.catch.bind(p);
		this.finally = p.finally.bind(p);
	}
}