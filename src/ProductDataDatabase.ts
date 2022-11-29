import ProductData from "./ProductData";
import pgp from "pg-promise";

export default class ProductDataDatabase implements ProductData {

	async getProduct(idProduct: number): Promise<any> {
		const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
		const [product] = await connection.query("select * from cccat9.product where id_product = $1", [idProduct]);
		await connection.$pool.end();
		return product;
	}

}
