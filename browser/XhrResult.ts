interface IXhrOptions {
	url: string;
	// only allow GETs for POC.
}

class XhrResult {
	cancel: () => void;
	then: (callback: (value?: any) => void) => Promise<any>;
	catch: (callback: (error?: any) => void) => Promise<any>;
	finally: (callback: () => void) => Promise<any>;

	constructor(options: IXhrOptions) {
		let { url } = options;
		let xhr = new XMLHttpRequest();
		xhr.open('GET', url, true);
		let p = new Promise((resolve, reject) => {
			xhr.onload = function () {
				let result = JSON.parse(this.responseText);
				resolve(result);
			}
			xhr.onabort = function () {
				reject(new DOMException('The user aborted a request.'));
			}
		});
		
		this.cancel = xhr.abort.bind(xhr);
		xhr.send();
		this.then = p.then.bind(p);
		this.catch = p.catch.bind(p);
		this.finally = p.finally.bind(p);
	}
}