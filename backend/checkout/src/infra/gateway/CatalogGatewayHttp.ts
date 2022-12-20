import axios from "axios";
import Product from "../../domain/entities/Product";
import CatalogGateway from "./CatalogGateway";

export default class CatalogGatewayHttp implements CatalogGateway {

	async getProduct(idProduct: number): Promise<Product> {
		const response = await axios.get(`http://localhost:3002/products/${idProduct}`);
		const productData = response.data;
		return new Product(productData.idProduct, productData.description, productData.price, productData.width, productData.height, productData.length, productData.weight, productData.currency);
	}

}
