import HttpServer from "./HttpServer";
import express from "express";
import cors from "cors";

export default class ExpressHttpServer implements HttpServer {
	app: any;

	constructor () {
		this.app = express();
		this.app.use(express.json());
		this.app.use(cors());
	}
	
	on(method: string, url: string, callback: Function): void {
		this.app[method](url, async function (req: any, res: any) {
			try {
				const output = await callback(req.params, req.body);
				res.json(output);
			} catch (error: any) {
				res.status(422).json({
					message: error.message
				});
			}
		});
	}

	listen(port: number): void {
		return this.app.listen(port);
	}

}