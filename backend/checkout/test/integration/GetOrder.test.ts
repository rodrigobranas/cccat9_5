import Checkout from "../../src/application/Checkout";
import CouponDataDatabase from "../../src/infra/data/CouponDataDatabase";
import GetOrderByCpf from "../../src/application/GetOrderByCpf";
import OrderDataDatabase from "../../src/infra/data/OrderDataDatabase";
import ProductDataDatabase from "../../src/infra/data/ProductDataDatabase";
import PgPromiseConnection from "../../src/infra/database/PgPromiseConnection";
import FreightGatewayHttp from "../../src/infra/gateway/FreightGatewayHttp";
import CatalogGatewayHttp from "../../src/infra/gateway/CatalogGatewayHttp";

test("Deve consultar um pedido", async function () {
	const connection = new PgPromiseConnection();
	const productData = new ProductDataDatabase(connection);
	const couponData = new CouponDataDatabase(connection);
	const orderData = new OrderDataDatabase(connection);
	const freightGateway = new FreightGatewayHttp();
	const catalogGateway = new CatalogGatewayHttp();
	const checkout = new Checkout(catalogGateway, couponData, orderData, freightGateway);
	const input = {
		cpf: "987.654.321-00",
		items: [
			{ idProduct: 1, quantity: 1 },
			{ idProduct: 2, quantity: 1 },
			{ idProduct: 3, quantity: 3 }
		]
	}
	await checkout.execute(input);
	const getOrderByCpf = new GetOrderByCpf(orderData);
	const output = await getOrderByCpf.execute("987.654.321-00");
	expect(output.total).toBe(6370);
	await connection.close();
});

