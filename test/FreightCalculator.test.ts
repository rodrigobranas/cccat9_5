import FreightCalculator from "../src/domain/entities/FreightCalculator";

test("Deve calcular o frete", function () {
	const product = {
		width: 100,
		height: 30,
		length: 10,
		weight: 3
	}
	const freight = FreightCalculator.calculate(product);
	expect(freight).toBe(30);
});

test("Deve calcular o frete mínimo", function () {
	const product = {
		width: 10,
		height: 10,
		length: 10,
		weight: 0.9
	}
	const freight = FreightCalculator.calculate(product);
	expect(freight).toBe(10);
});
