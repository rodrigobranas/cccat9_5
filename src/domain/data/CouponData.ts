import Coupon from "../entities/Coupon";

export default interface CouponData {
	getCoupon (code: string): Promise<Coupon>;
}
