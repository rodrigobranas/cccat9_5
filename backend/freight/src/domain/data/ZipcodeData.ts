import Zipcode from "../entities/Zipcode";

export default interface ZipcodeData {
	get (code: string): Promise<Zipcode | undefined>;
}
