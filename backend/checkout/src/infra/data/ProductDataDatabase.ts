import ProductData from "../../domain/data/ProductData";
import pgp from "pg-promise";
import Product from "../../domain/entities/Product";
import Connection from "../database/Connection";

export default class ProductDataDatabase implements ProductData {

	constructor (readonly connection: Connection) {
	}

	async getProduct(idProduct: number): Promise<Product> {
		const [productData] = await this.connection.query("select * from cccat9.product where id_product = $1", [idProduct]);
		if (!productData) throw new Error("Product not found");
		return new Product(productData.id_product, productData.description, parseFloat(productData.price), productData.width, productData.height, productData.length, productData.weight, productData.currency);
	}

}
