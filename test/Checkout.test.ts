import Checkout from "../src/Checkout";
import CouponData from "../src/CouponData";
import CouponDataDatabase from "../src/CouponDataDatabase";
import ProductData from "../src/ProductData";
import ProductDataDatabase from "../src/ProductDataDatabase";
import sinon from "sinon";
import CurrencyGateway from "../src/CurrencyGatewayRandom";
import MailerConsole from "../src/MailerConsole";
import Mailer from "../src/Mailer";

test("Deve fazer um pedido com 3 produtos", async function () {
	const input = {
		cpf: "987.654.321-00",
		items: [
			{ idProduct: 1, quantity: 1 },
			{ idProduct: 2, quantity: 1 },
			{ idProduct: 3, quantity: 3 }
		]
	};
	// const productData = new ProductDataDatabase();
	// const couponData = new CouponDataDatabase();
	const productData: ProductData = {
		async getProduct (idProduct: number): Promise<any> {
			const products: { [idProduct: number]: any } = {
				1: { idProduct: 1, description: "A", price: 1000, width: 100, height: 30, length: 10, weight: 3},
				2: { idProduct: 2, description: "B", price: 5000, width: 50, height: 50, length: 50, weight: 22},
				3: { idProduct: 3, description: "C", price: 30, width: 10, height: 10, length: 10, weight: 0.9}
			}
			return products[idProduct];
		}
	}
	const couponData: CouponData = {
		async getCoupon (code: string): Promise<any> {
			const coupons: any = {
				"VALE20": { code: "VALE20", percentage: 20, expire_date: new Date("2022-12-01T10:00:00")},
				"VALE20_EXPIRED": { code: "VALE20_EXPIRED", percentage: 20, expire_date: new Date("2022-10-01T10:00:00")}
			}
			return coupons[code];
		}
	}
	const checkout = new Checkout(productData, couponData);
	const output = await checkout.execute(input);
	expect(output.total).toBe(6350);
});

test("Deve fazer um pedido com 4 produtos com moedas diferentes", async function () {
	const currencyGatewayStub = sinon.stub(CurrencyGateway.prototype, "getCurrencies").resolves({
		"USD": 2,
		"BRL": 1
	});
	const mailerSpy = sinon.spy(MailerConsole.prototype, "send");
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
	// const productData = new ProductDataDatabase();
	// const couponData = new CouponDataDatabase();
	const productData: ProductData = {
		async getProduct (idProduct: number): Promise<any> {
			const products: { [idProduct: number]: any } = {
				1: { idProduct: 1, description: "A", price: 1000, width: 100, height: 30, length: 10, weight: 3, currency: "BRL"},
				2: { idProduct: 2, description: "B", price: 5000, width: 50, height: 50, length: 50, weight: 22, currency: "BRL"},
				3: { idProduct: 3, description: "C", price: 30, width: 10, height: 10, length: 10, weight: 0.9, currency: "BRL"},
				4: { idProduct: 4, description: "D", price: 100, width: 100, height: 30, length: 10, weight: 3, currency: "USD"},

			}
			return products[idProduct];
		}
	}
	const couponData: CouponData = {
		async getCoupon (code: string): Promise<any> {
			const coupons: any = {
				"VALE20": { code: "VALE20", percentage: 20, expire_date: new Date("2022-12-01T10:00:00")},
				"VALE20_EXPIRED": { code: "VALE20_EXPIRED", percentage: 20, expire_date: new Date("2022-10-01T10:00:00")}
			}
			return coupons[code];
		}
	}
	const checkout = new Checkout(productData, couponData);
	const output = await checkout.execute(input);
	expect(output.total).toBe(6580);
	expect(mailerSpy.calledOnce).toBeTruthy();
	expect(mailerSpy.calledWith("rodrigo@branas.io", "Checkout Success", "ABCDEF")).toBeTruthy();
	currencyGatewayStub.restore();
	mailerSpy.restore();
});

test("Deve fazer um pedido com 4 produtos com moedas diferentes com mock", async function () {
	const currencyGatewayMock = sinon.mock(CurrencyGateway.prototype)
	currencyGatewayMock.expects("getCurrencies")
		.once()
		.resolves({
			"USD": 2,
			"BRL": 1
		});
	const mailerMock = sinon.mock(MailerConsole.prototype);
	mailerMock.expects("send")
		.once()
		.withArgs("rodrigo@branas.io", "Checkout Success", "ABCDEF");
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
	// const productData = new ProductDataDatabase();
	// const couponData = new CouponDataDatabase();
	const productData: ProductData = {
		async getProduct (idProduct: number): Promise<any> {
			const products: { [idProduct: number]: any } = {
				1: { idProduct: 1, description: "A", price: 1000, width: 100, height: 30, length: 10, weight: 3, currency: "BRL"},
				2: { idProduct: 2, description: "B", price: 5000, width: 50, height: 50, length: 50, weight: 22, currency: "BRL"},
				3: { idProduct: 3, description: "C", price: 30, width: 10, height: 10, length: 10, weight: 0.9, currency: "BRL"},
				4: { idProduct: 4, description: "D", price: 100, width: 100, height: 30, length: 10, weight: 3, currency: "USD"},

			}
			return products[idProduct];
		}
	}
	const couponData: CouponData = {
		async getCoupon (code: string): Promise<any> {
			const coupons: any = {
				"VALE20": { code: "VALE20", percentage: 20, expire_date: new Date("2022-12-01T10:00:00")},
				"VALE20_EXPIRED": { code: "VALE20_EXPIRED", percentage: 20, expire_date: new Date("2022-10-01T10:00:00")}
			}
			return coupons[code];
		}
	}
	const checkout = new Checkout(productData, couponData);
	const output = await checkout.execute(input);
	expect(output.total).toBe(6580);
	mailerMock.verify();
	mailerMock.restore();
	currencyGatewayMock.verify();
	currencyGatewayMock.restore();
});

test("Deve fazer um pedido com 4 produtos com moedas diferentes com fake", async function () {
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
	// const productData = new ProductDataDatabase();
	// const couponData = new CouponDataDatabase();
	const productData: ProductData = {
		async getProduct (idProduct: number): Promise<any> {
			const products: { [idProduct: number]: any } = {
				1: { idProduct: 1, description: "A", price: 1000, width: 100, height: 30, length: 10, weight: 3, currency: "BRL"},
				2: { idProduct: 2, description: "B", price: 5000, width: 50, height: 50, length: 50, weight: 22, currency: "BRL"},
				3: { idProduct: 3, description: "C", price: 30, width: 10, height: 10, length: 10, weight: 0.9, currency: "BRL"},
				4: { idProduct: 4, description: "D", price: 100, width: 100, height: 30, length: 10, weight: 3, currency: "USD"},

			}
			return products[idProduct];
		}
	}
	const couponData: CouponData = {
		async getCoupon (code: string): Promise<any> {
			const coupons: any = {
				"VALE20": { code: "VALE20", percentage: 20, expire_date: new Date("2022-12-01T10:00:00")},
				"VALE20_EXPIRED": { code: "VALE20_EXPIRED", percentage: 20, expire_date: new Date("2022-10-01T10:00:00")}
			}
			return coupons[code];
		}
	}
	const currencyGateway: CurrencyGateway = {
		async getCurrencies(): Promise<any> {
			return {
				"USD": 2,
				"BRL": 1
			}
		}
	}
	const log: { to: string, subject: string, message: string }[] = [];
	const mailer: Mailer = {
		async send (to: string, subject: string, message: string): Promise<any> {
			log.push({ to, subject, message });
		}
	}
	const checkout = new Checkout(productData, couponData, currencyGateway, mailer);
	const output = await checkout.execute(input);
	expect(output.total).toBe(6580);
	expect(log).toHaveLength(1);
	expect(log[0].to).toBe("rodrigo@branas.io");
	expect(log[0].subject).toBe("Checkout Success");
	expect(log[0].message).toBe("ABCDEF");
});
