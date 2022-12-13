import Product from "../../domain/Product";

export default interface CheckoutGateway {
	getProducts (): Promise<Product[]>;
	checkout (input: any): Promise<any>;
}
