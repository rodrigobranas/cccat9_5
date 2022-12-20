export default class FreightCalculator {

	static calculate (volume: number, density: number, distance: number = 1000) {
		const itemFreight = distance * volume * (density/100);
		return (itemFreight >= 10) ? Math.round(itemFreight*100)/100 : 10;
	}
}
