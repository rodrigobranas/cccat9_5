import ProductData from "../domain/data/ProductData";
import Product from "../domain/entities/Product";

export default class GetProducts {

	constructor (readonly productData: ProductData) {
	}

	async execute (): Promise<Output[]> {
		const products = await this.productData.getProducts();
		return products.map((product: Product) => Object.assign(product, { 
			volume: product.getVolume(), 
			density: product.getDensity() 
		}));
	}
}

type Output = {
	idProduct: number,
	description: string,
	price: number,
	volume: number,
	density: number
}