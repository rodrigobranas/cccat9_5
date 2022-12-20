import FreightCalculator from "../domain/entities/FreightCalculator";
import ZipcodeData from "../domain/data/ZipcodeData";
import DistanceCalculator from "../domain/entities/DistanceCalculator";

export default class CalculateFreight {

	constructor (readonly zipcodeData: ZipcodeData) {
	}

	async execute (input: Input): Promise<Output> {
		let distance;
		if (input.from && input.to) {
			const from = await this.zipcodeData.get(input.from);
			const to = await this.zipcodeData.get(input.to);
			if (from && to) {
				distance = DistanceCalculator.calculate(from.coord, to.coord);
			}
		}
		let total = 0;
		for (const item of input.items) {
			total += FreightCalculator.calculate(item.volume, item.density, distance) * item.quantity;
		}
		return {
			total
		};
	}
}

type Input = {
	from?: string,
	to?: string,
	items: { volume: number, density: number, quantity: number }[]
}

type Output = {
	total: number
}
