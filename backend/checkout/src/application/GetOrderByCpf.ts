import OrderData from "../domain/data/OrderData";

export default class GetOrderByCpf {

	constructor (readonly orderData: OrderData) {
	}

	async execute (cpf: string): Promise<Output> {
		const order = await this.orderData.getByCpf(cpf);
		return {
			total: parseFloat(order.total)
		}
	}
}

type Output = {
	total: number
}
