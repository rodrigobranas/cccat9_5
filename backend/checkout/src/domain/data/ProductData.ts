import Product from "../entities/Product";

export default interface ProductData {
	getProduct (idProduct: number): Promise<Product>;
}
