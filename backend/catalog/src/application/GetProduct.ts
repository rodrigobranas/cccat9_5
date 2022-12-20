import ProductData from "../domain/data/ProductData";

export default class GetProduct {

	constructor (readonly productData: ProductData) {
	}

	async execute (idProduct: number): Promise<Output> {
		const product = await this.productData.getProduct(idProduct);
		return Object.assign(product, { 
			volume: product.getVolume(), 
			density: product.getDensity() 
		});
	}
}

type Output = {
	idProduct: number,
	description: string,
	price: number,
	volume: number,
	density: number
}