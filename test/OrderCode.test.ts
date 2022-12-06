import OrderCode from "../src/domain/entities/OrderCode";

test("Deve criar um código para o pedido", function () {
	const orderCode = new OrderCode(new Date("2022-12-10T10:00:00"), 1);
	expect(orderCode.getValue()).toBe("202200000001");
});

test("Não deve criar um código para o pedido se a sequence for negativa", function () {
	expect(() => new OrderCode(new Date("2022-12-10T10:00:00"), -1)).toThrow(new Error("Invalid sequence"));
});
