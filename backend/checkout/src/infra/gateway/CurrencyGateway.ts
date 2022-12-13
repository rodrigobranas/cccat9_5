import Currencies from "../../domain/entities/Currencies";

export default interface CurrencyGateway {
	getCurrencies (): Promise<Currencies>
}