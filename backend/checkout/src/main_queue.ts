import Checkout from "./application/Checkout";
import CouponDataDatabase from "./infra/data/CouponDataDatabase";
import OrderDataDatabase from "./infra/data/OrderDataDatabase";
import ProductDataDatabase from "./infra/data/ProductDataDatabase";
import PgPromiseConnection from "./infra/database/PgPromiseConnection";
import CatalogGatewayHttp from "./infra/gateway/CatalogGatewayHttp";
import FreightGatewayHttp from "./infra/gateway/FreightGatewayHttp";
import QueueController from "./infra/queue/QueueController";
import RabbitMQAdapter from "./infra/queue/RabbitMQAdapter";


async function init () {
	const queue = new RabbitMQAdapter();
	await queue.connect();
	const connection = new PgPromiseConnection();
	const productData = new ProductDataDatabase(connection);
	const couponData = new CouponDataDatabase(connection);
	const orderData = new OrderDataDatabase(connection);
	const freightGateway = new FreightGatewayHttp();
	const catalogGateway = new CatalogGatewayHttp();
	const checkout = new Checkout(catalogGateway, couponData, orderData, freightGateway);
	new QueueController(queue, checkout);
}

init();
