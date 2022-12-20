import GetProduct from "../../application/GetProduct";
import GetProducts from "../../application/GetProducts";
import HttpServer from "../http/HttpServer";

export default class RestController {

	constructor (readonly httpServer: HttpServer, readonly getProducts: GetProducts, readonly getProduct: GetProduct) {
		httpServer.on("get", "/products", async function (params: any, body: any) {
			const output = await getProducts.execute();
			return output;
		});

		httpServer.on("get", "/products/:idProduct", async function (params: any, body: any) {
			const output = await getProduct.execute(params.idProduct);
			return output;
		});
	}
}