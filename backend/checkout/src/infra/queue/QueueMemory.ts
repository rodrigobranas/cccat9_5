import Queue from "./Queue";

export default class QueueMemory implements Queue {
	observers: { queueName: string, callback: Function }[];

	constructor () {
		this.observers = [];
	}

	async connect(): Promise<any> {
	}

	async on(queueName: string, callback: Function): Promise<void> {
		this.observers.push({ queueName, callback });
	}

	async publish(queueName: string, data: any): Promise<void> {
		for (const observer of this.observers) {
			if (observer.queueName === queueName) {
				await observer.callback(data);
			}
		}
	}

}
