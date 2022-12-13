import FreightCalculator from "../../src/domain/entities/FreightCalculator";
import Product from "../../src/domain/entities/Product";

test("Deve calcular o frete", function () {
	const product = new Product(1, "A", 1000, 100, 30, 10, 3);
	const freight = FreightCalculator.calculate(product);
	expect(freight).toBe(30);
});

test("Deve calcular o frete mínimo", function () {
	const product = new Product(3, "C", 10, 10, 10, 10, 0.9);
	const freight = FreightCalculator.calculate(product);
	expect(freight).toBe(10);
});
