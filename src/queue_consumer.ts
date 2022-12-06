import amqp from "amqplib";
import Checkout from "./application/Checkout";
import CouponDataDatabase from "./infra/data/CouponDataDatabase";
import OrderDataDatabase from "./infra/data/OrderDataDatabase";
import ProductDataDatabase from "./infra/data/ProductDataDatabase";
import PgPromiseConnection from "./infra/database/PgPromiseConnection";


async function init () {
	const connectionQueue = await amqp.connect("amqp://localhost");
	const channel = await connectionQueue.createChannel();
	await channel.assertQueue("checkout", { durable: true });
	await channel.consume("checkout", async function (msg: any) {
		const input = JSON.parse(msg.content.toString());
		try {
			const connection = new PgPromiseConnection();
			const productData = new ProductDataDatabase(connection);
			const couponData = new CouponDataDatabase(connection);
			const orderData = new OrderDataDatabase(connection);
			const checkout = new Checkout(productData, couponData, orderData);
			const output = await checkout.execute(input);
			console.log(output);
		} catch (error: any) {
			console.log(error.message);
		}
		channel.ack(msg);
	});
}

init();
