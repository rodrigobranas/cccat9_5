import CurrencyGateway from "./CurrencyGateway";

export default class CurrencyGatewayRandom implements CurrencyGateway {
	async getCurrencies () {
		return {
			"USD": 3 + Math.random(),
			"BRL": 1
		};
	}
}