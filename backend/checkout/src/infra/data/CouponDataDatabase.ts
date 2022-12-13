import CouponData from "../../domain/data/CouponData";
import Coupon from "../../domain/entities/Coupon";
import Connection from "../database/Connection";

export default class CouponDataDatabase implements CouponData {

	constructor (readonly connection: Connection) {
	}

	async getCoupon(code: string): Promise<Coupon> {
		const [couponData] = await this.connection.query("select * from cccat9.coupon where code = $1", [code]);
		if (!couponData) throw new Error("Coupon not found");
		return new Coupon(couponData.code, parseFloat(couponData.percentage), couponData.expire_date);
	}

}