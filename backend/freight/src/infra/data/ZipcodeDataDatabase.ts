import ZipcodeData from "../../domain/data/ZipcodeData";
import Zipcode from "../../domain/entities/Zipcode";
import Connection from "../database/Connection";

export default class ZipcodeDataDatabase implements ZipcodeData {

	constructor (readonly connection: Connection) {
	}

	async get(code: string): Promise<Zipcode | undefined> {
		const [zipcodeData] = await this.connection.query("select * from cccat9.zipcode where code = $1", [code]);
		if (!zipcodeData) return;
		return new Zipcode(zipcodeData.code, zipcodeData.street, zipcodeData.neighborhood, parseFloat(zipcodeData.lat), parseFloat(zipcodeData.long));
	}
	
}
