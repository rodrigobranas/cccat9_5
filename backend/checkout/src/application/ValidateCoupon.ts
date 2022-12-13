import Coupon from "../domain/entities/Coupon";
import CouponData from "../domain/data/CouponData";

export default class ValidateCoupon {

	constructor (readonly couponData: CouponData) {
	}

	async execute (code: string, total: number): Promise<Output> {
		const coupon = await this.couponData.getCoupon(code);
		return {
			isExpired: coupon.isExpired(),
			discount: coupon.getDiscount(total)
		}
	}
}

type Output = {
	isExpired: boolean,
	discount: number
}