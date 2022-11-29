export default interface CouponData {
	getCoupon (code: string): Promise<any>;
}
