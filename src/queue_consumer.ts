import amqp from "amqplib";
import Checkout from "./Checkout";
import CouponDataDatabase from "./CouponDataDatabase";
import ProductDataDatabase from "./ProductDataDatabase";


async function init () {
	const connectionQueue = await amqp.connect("amqp://localhost");
	const channel = await connectionQueue.createChannel();
	await channel.assertQueue("checkout", { durable: true });
	await channel.consume("checkout", async function (msg: any) {
		const input = JSON.parse(msg.content.toString());
		try {
			const productData = new ProductDataDatabase();
			const couponData = new CouponDataDatabase();
			const checkout = new Checkout(productData, couponData);
			const output = await checkout.execute(input);
			console.log(output);
		} catch (error: any) {
			console.log(error.message);
		}
		channel.ack(msg);
	});
}

init();
