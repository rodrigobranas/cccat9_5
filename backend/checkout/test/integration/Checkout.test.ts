import Checkout from "../../src/application/Checkout";
import CouponData from "../../src/domain/data/CouponData";
import ProductData from "../../src/domain/data/ProductData";
import sinon from "sinon";
import CurrencyGateway from "../../src/infra/gateway/CurrencyGatewayRandom";
import OrderData from "../../src/domain/data/OrderData";
import Currencies from "../../src/domain/entities/Currencies";
import Product from "../../src/domain/entities/Product";
import FreightGatewayHttp from "../../src/infra/gateway/FreightGatewayHttp";
import CatalogGatewayHttp from "../../src/infra/gateway/CatalogGatewayHttp";

let checkout: Checkout;

beforeEach(function () {
	const productData: ProductData = {
		async getProduct (idProduct: number): Promise<any> {
			const products: { [idProduct: number]: Product } = {
				1: new Product(1, "A", 1000, 100, 30, 10, 3,  "BRL"),
				2: new Product(2, "B", 5000, 50, 50, 50, 22,  "BRL"),
				3: new Product(3, "C", 30, 10, 10, 10, 0.9, "BRL"),
				4: new Product(4, "D", 100, 100, 30, 10, 3,  "USD")

			}
			return products[idProduct];
		}
	}
	const couponData: CouponData = {
		async getCoupon (code: string): Promise<any> {
			const coupons: any = {
				"VALE20": { code: "VALE20", percentage: 20, expire_date: new Date("2023-12-01T10:00:00")},
				"VALE20_EXPIRED": { code: "VALE20_EXPIRED", percentage: 20, expire_date: new Date("2022-10-01T10:00:00")}
			}
			return coupons[code];
		}
	}
	const orderData: OrderData = {
		async save(order: any): Promise<void> {
		},
		async getByCpf(cpf: string): Promise<any> {
		},
		async count(): Promise<number> {
			return 0;
		},
		async clean (): Promise<void> {
		}
	}
	const freightGateway = new FreightGatewayHttp();
	const catalogGateway = new CatalogGatewayHttp();
	checkout = new Checkout(catalogGateway, couponData, orderData, freightGateway);
});

test("Deve fazer um pedido com 3 produtos", async function () {
	const input = {
		cpf: "987.654.321-00",
		items: [
			{ idProduct: 1, quantity: 1 },
			{ idProduct: 2, quantity: 1 },
			{ idProduct: 3, quantity: 3 }
		]
	};
	const output = await checkout.execute(input);
	expect(output.total).toBe(6370);
});

test("Deve fazer um pedido com 4 produtos com moedas diferentes", async function () {
	const currencies = new Currencies();
	currencies.addCurrency("USD", 2);
	currencies.addCurrency("BRL", 1);
	const currencyGatewayStub = sinon.stub(CurrencyGateway.prototype, "getCurrencies").resolves(currencies);
	const input = {
		cpf: "987.654.321-00",
		email: "rodrigo@branas.io",
		items: [
			{ idProduct: 1, quantity: 1 },
			{ idProduct: 2, quantity: 1 },
			{ idProduct: 3, quantity: 3 },
			{ idProduct: 4, quantity: 1 }
		]
	};
	const output = await checkout.execute(input);
	expect(output.total).toBe(6600);
	currencyGatewayStub.restore();
});

test("Deve fazer um pedido com 4 produtos com moedas diferentes com mock", async function () {
	const currencies = new Currencies();
	currencies.addCurrency("USD", 2);
	currencies.addCurrency("BRL", 1);
	const currencyGatewayMock = sinon.mock(CurrencyGateway.prototype)
	currencyGatewayMock.expects("getCurrencies")
		.once()
		.resolves(currencies);
	const input = {
		cpf: "987.654.321-00",
		email: "rodrigo@branas.io",
		items: [
			{ idProduct: 1, quantity: 1 },
			{ idProduct: 2, quantity: 1 },
			{ idProduct: 3, quantity: 3 },
			{ idProduct: 4, quantity: 1 }
		]
	};
	const output = await checkout.execute(input);
	expect(output.total).toBe(6600);
	currencyGatewayMock.verify();
	currencyGatewayMock.restore();
});

test("Deve fazer um pedido com 3 produtos com código do pedido", async function () {
	const input = {
		cpf: "987.654.321-00",
		items: [
			{ idProduct: 1, quantity: 1 },
			{ idProduct: 2, quantity: 1 },
			{ idProduct: 3, quantity: 3 }
		]
	};
	const output = await checkout.execute(input);
	expect(output.code).toBe("202200000001");
});

test("Deve fazer um pedido com 3 produtos com CEP de origem e destino", async function () {
	const input = {
		from: "22030060",
		to: "88015600",
		cpf: "987.654.321-00",
		items: [
			{ idProduct: 1, quantity: 1 },
			{ idProduct: 2, quantity: 1 },
			{ idProduct: 3, quantity: 3 }
		]
	};
	const output = await checkout.execute(input);
	expect(output.total).toBe(6307.06);
});
