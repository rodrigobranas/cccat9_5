import CouponDataDatabase from "../src/infra/data/CouponDataDatabase";
import ValidateCoupon from "../src/application/ValidateCoupon";
import PgPromiseConnection from "../src/infra/database/PgPromiseConnection";

test("Deve validar um cupom de desconto", async function () {
	const connection = new PgPromiseConnection();
	const couponData = new CouponDataDatabase(connection);
	const validateCoupon = new ValidateCoupon(couponData);
	const output = await validateCoupon.execute("VALE20", 1000);
	expect(output.isExpired).toBeFalsy();
	expect(output.discount).toBe(200);
});
