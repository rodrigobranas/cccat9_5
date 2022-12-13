import Product from "../../domain/Product";
import CheckoutGateway from "./CheckoutGateway";
import HttpClient from "../http/HttpClient";

export default class CheckoutGatewayHttp implements CheckoutGateway {

	constructor (readonly httpClient: HttpClient, readonly baseUrl: string) {
	}

	async getProducts(): Promise<Product[]> {
		const productsData = await this.httpClient.get(`${this.baseUrl}/products`)
		const products: Product[] = [];
		for (const productData of productsData) {
			products.push(new Product(productData.idProduct, productData.description, productData.price));
		}
		return products;
	}

	async checkout(input: any): Promise<any> {
		const output = await this.httpClient.post(`${this.baseUrl}/checkout`, input);
		return output;
	}

}
