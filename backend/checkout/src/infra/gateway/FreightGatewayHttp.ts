import axios from "axios";
import FreightGateway from "./FreightGateway";

export default class FreightGatewayHttp implements FreightGateway {

	async calculateFreight(items: { volume: number; density: number; quantity: number; }[], from?: string | undefined, to?: string | undefined): Promise<any> {
		const response = await axios.post("http://localhost:3001/calculateFreight", { from, to, items });
		return response.data;
	}

}
