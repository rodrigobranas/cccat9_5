import Product from "./Product";

export default class FreightCalculator {

	static calculate (product: Product) {
		const volume = product.getVolume();
		const density = product.getDensity();
		const itemFreight = 1000 * volume * (density/100);
		return (itemFreight >= 10) ? itemFreight : 10;
	}
}
