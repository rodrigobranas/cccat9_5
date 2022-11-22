import axios from "axios";

axios.defaults.validateStatus = function () {
	return true;
}

test("Não deve fazer um pedido com cpf inválido", async function () {
	const input = {
		cpf: "987.654.321-01"
	};
	const response = await axios.post("http://localhost:3000/checkout", input)
	expect(response.status).toBe(422);
	const output = response.data;
	expect(output.message).toBe("Invalid cpf");
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
	const response = await axios.post("http://localhost:3000/checkout", input)
	const output = response.data;
	expect(output.total).toBe(6090);
});

test("Não deve fazer pedido com produto que não existe", async function () {
	const input = {
		cpf: "987.654.321-00",
		items: [
			{ idProduct: 4, quantity: 1 }
		]
	};
	const response = await axios.post("http://localhost:3000/checkout", input)
	expect(response.status).toBe(422);
	const output = response.data;
	expect(output.message).toBe("Product not found");
});

test("Deve fazer um pedido com 3 produtos com cupom de desconto", async function () {
	const input = {
		cpf: "987.654.321-00",
		items: [
			{ idProduct: 1, quantity: 1 },
			{ idProduct: 2, quantity: 1 },
			{ idProduct: 3, quantity: 3 }
		],
		coupon: "VALE20"
	};
	const response = await axios.post("http://localhost:3000/checkout", input)
	const output = response.data;
	expect(output.total).toBe(4872);
});
