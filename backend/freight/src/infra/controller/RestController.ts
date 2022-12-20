import CalculateFreight from "../../application/CalculateFreight";
import HttpServer from "../http/HttpServer";

export default class RestController {

	constructor (readonly httpServer: HttpServer, readonly calculateFreight: CalculateFreight) {
		httpServer.on("post", "/calculateFreight", async function (params: any, body: any) {
			const output = await calculateFreight.execute(body);
			return output;
		});
	}
}