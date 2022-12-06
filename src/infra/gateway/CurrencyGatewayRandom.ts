import Currencies from "../../domain/entities/Currencies";
import CurrencyGateway from "./CurrencyGateway";

export default class CurrencyGatewayRandom implements CurrencyGateway {
	async getCurrencies () {
		const currencies = new Currencies();
		currencies.addCurrency("USD", 3);
		currencies.addCurrency("BRL", 1);
		return currencies;
	}
}