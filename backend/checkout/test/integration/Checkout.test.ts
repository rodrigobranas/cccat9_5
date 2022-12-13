import Checkout from "../../src/application/Checkout";
import CouponData from "../../src/domain/data/CouponData";
import CouponDataDatabase from "../../src/infra/data/CouponDataDatabase";
import ProductData from "../../src/domain/data/ProductData";
import ProductDataDatabase from "../../src/infra/data/ProductDataDatabase";
import sinon from "sinon";
import CurrencyGateway from "../../src/infra/gateway/CurrencyGatewayRandom";
import MailerConsole from "../../src/infra/mailer/MailerConsole";
import Mailer from "../../src/infra/mailer/Mailer";
import OrderData from "../../src/domain/data/OrderData";
import Currencies from "../../src/domain/entities/Currencies";
import Product from "../../src/domain/entities/Product";

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
			const products: { [idProduct: number]: Product } = {
				1: new Product(1, "A", 1000, 100, 30, 10, 3,  "BRL"),
				2: new Product(2, "B", 5000, 50, 50, 50, 22,  "BRL"),
				3: new Product(3, "C", 30, 10, 10, 10, 0.9, "BRL")

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
	const orderData: OrderData = {
		async save(order: any): Promise<void> {
		},
		async getByCpf(cpf: string): Promise<any> {
		},
		async count (): Promise<number> {
			return 1;
		}
	}
	const checkout = new Checkout(productData, couponData, orderData);
	const output = await checkout.execute(input);
	expect(output.total).toBe(6350);
});

test("Deve fazer um pedido com 4 produtos com moedas diferentes", async function () {
	const currencies = new Currencies();
	currencies.addCurrency("USD", 2);
	currencies.addCurrency("BRL", 1);
	const currencyGatewayStub = sinon.stub(CurrencyGateway.prototype, "getCurrencies").resolves(currencies);
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
			const products: { [idProduct: number]: Product } = {
				1: new Product(1, "A", 1000, 100, 30, 10, 3,  "BRL"),
				2: new Product(2, "B", 5000, 50, 50, 50, 22,  "BRL"),
				3: new Product(3, "C", 30, 10, 10, 10, 0.9, "BRL"),
				4: new Product(4, "D", 100, 100, 30, 10, 3,  "USD"),

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
	const orderData: OrderData = {
		async save(order: any): Promise<void> {
		},
		async getByCpf(cpf: string): Promise<any> {
		},
		async count (): Promise<number> {
			return 1;
		}
	}
	const checkout = new Checkout(productData, couponData, orderData);
	const output = await checkout.execute(input);
	expect(output.total).toBe(6580);
	// expect(mailerSpy.calledOnce).toBeTruthy();
	// expect(mailerSpy.calledWith("rodrigo@branas.io", "Checkout Success", "ABCDEF")).toBeTruthy();
	currencyGatewayStub.restore();
	mailerSpy.restore();
});

test("Deve fazer um pedido com 4 produtos com moedas diferentes com mock", async function () {
	const currencies = new Currencies();
	currencies.addCurrency("USD", 2);
	currencies.addCurrency("BRL", 1);
	const currencyGatewayMock = sinon.mock(CurrencyGateway.prototype)
	currencyGatewayMock.expects("getCurrencies")
		.once()
		.resolves(currencies);
	// const mailerMock = sinon.mock(MailerConsole.prototype);
	// mailerMock.expects("send")
	// 	.once()
	// 	.withArgs("rodrigo@branas.io", "Checkout Success", "ABCDEF");
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
			const products: { [idProduct: number]: Product } = {
				1: new Product(1, "A", 1000, 100, 30, 10, 3,  "BRL"),
				2: new Product(2, "B", 5000, 50, 50, 50, 22,  "BRL"),
				3: new Product(3, "C", 30, 10, 10, 10, 0.9, "BRL"),
				4: new Product(4, "D", 100, 100, 30, 10, 3,  "USD"),

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
	const orderData: OrderData = {
		async save(order: any): Promise<void> {
		},
		async getByCpf(cpf: string): Promise<any> {
		},
		async count (): Promise<number> {
			return 1;
		}
	}
	const checkout = new Checkout(productData, couponData, orderData);
	const output = await checkout.execute(input);
	expect(output.total).toBe(6580);
	// mailerMock.verify();
	// mailerMock.restore();
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
		async getProduct (idProduct: number): Promise<Product> {
			const products: { [idProduct: number]: Product } = {
				1: new Product(1, "A", 1000, 100, 30, 10, 3,  "BRL"),
				2: new Product(2, "B", 5000, 50, 50, 50, 22,  "BRL"),
				3: new Product(3, "C", 30, 10, 10, 10, 0.9, "BRL"),
				4: new Product(4, "D", 100, 100, 30, 10, 3,  "USD"),

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
	const currencies = new Currencies();
	currencies.addCurrency("USD", 2);
	currencies.addCurrency("BRL", 1);
	const currencyGateway: CurrencyGateway = {
		async getCurrencies(): Promise<any> {
			return currencies;
		}
	}
	const log: { to: string, subject: string, message: string }[] = [];
	const mailer: Mailer = {
		async send (to: string, subject: string, message: string): Promise<any> {
			log.push({ to, subject, message });
		}
	}
	const orderData: OrderData = {
		async save(order: any): Promise<void> {
		},
		async getByCpf(cpf: string): Promise<any> {
		},
		async count (): Promise<number> {
			return 1;
		}
	}
	const checkout = new Checkout(productData, couponData, orderData, currencyGateway, mailer);
	const output = await checkout.execute(input);
	expect(output.total).toBe(6580);
	// expect(log).toHaveLength(1);
	// expect(log[0].to).toBe("rodrigo@branas.io");
	// expect(log[0].subject).toBe("Checkout Success");
	// expect(log[0].message).toBe("ABCDEF");
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
	// const productData = new ProductDataDatabase();
	// const couponData = new CouponDataDatabase();
	const productData: ProductData = {
		async getProduct (idProduct: number): Promise<any> {
			const products: { [idProduct: number]: Product } = {
				1: new Product(1, "A", 1000, 100, 30, 10, 3,  "BRL"),
				2: new Product(2, "B", 5000, 50, 50, 50, 22,  "BRL"),
				3: new Product(3, "C", 30, 10, 10, 10, 0.9, "BRL")

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
	const orderData: OrderData = {
		async save(order: any): Promise<void> {
		},
		async getByCpf(cpf: string): Promise<any> {
		},
		async count (): Promise<number> {
			return 0;
		}
	}
	const checkout = new Checkout(productData, couponData, orderData);
	const output = await checkout.execute(input);
	expect(output.code).toBe("202200000001");
});
