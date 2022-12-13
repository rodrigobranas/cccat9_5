export default class Order {
	code = "";
	items: any[];
	total = 0;

	constructor (readonly cpf: string) {
		this.items = [];
	}

	addItem (product: any) {
		const existingItem = this.items.find((item: any) => item.idProduct === product.idProduct);
		if (!existingItem) {
			this.items.push({ idProduct: product.idProduct, price: product.price, quantity: 1 });
		} else {
			existingItem.quantity++;
		}
	}

	increaseItem (idProduct: any) {
		const existingItem = this.items.find((item: any) => item.idProduct === idProduct);
		if (!existingItem) return;	
		existingItem.quantity++;
	}

	decreaseItem (idProduct: any) {
		const existingItem = this.items.find((item: any) => item.idProduct === idProduct);
		if (!existingItem) return;	
		existingItem.quantity--;
		if (existingItem.quantity === 0) {
			this.items.splice(this.items.indexOf(existingItem), 1);
		};
	}

	getTotal () {
		let total = 0;
		for (const item of this.items) {
			total += item.price * item.quantity;
		}
		return total;
	}
}
