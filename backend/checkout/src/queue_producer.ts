import amqp from "amqplib";

async function init () {
	const connection = await amqp.connect("amqp://localhost");
	const channel = await connection.createChannel();
	await channel.assertQueue("checkout", { durable: true });
	const input = {
		cpf: "987.654.321-00",
		items: [
			{ idProduct: 1, quantity: 1 },
			{ idProduct: 2, quantity: 1 },
			{ idProduct: 3, quantity: 3 }
		]
	};
	channel.sendToQueue("checkout", Buffer.from(JSON.stringify(input)));
}

init();