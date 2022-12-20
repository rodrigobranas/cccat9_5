import Product from "../../domain/entities/Product";

export default interface CatalogGateway {
	getProduct (idProduct: number): Promise<Product>;
}
