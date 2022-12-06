import Checkout from "../../application/Checkout";
import HttpServer from "../http/HttpServer";

export default class RestController {

	constructor (readonly httpServer: HttpServer, readonly checkout: Checkout) {
		httpServer.on("post", "/checkout", async function (params: any, body: any) {
			const output = await checkout.execute(body);
			return output;
		});
	}
}