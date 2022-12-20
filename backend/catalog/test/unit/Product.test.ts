import Product from "../../src/domain/entities/Product";

test("Deve calcular o volume do produto", function () {
	const product = new Product(1, "A", 1000, 100, 30, 10, 3);
	expect(product.getVolume()).toBe(0.03);
});

test("Deve calcular a densidade do produto", function () {
	const product = new Product(1, "A", 1000, 100, 30, 10, 3);
	expect(product.getDensity()).toBe(100);
});
