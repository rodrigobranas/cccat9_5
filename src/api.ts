import express from "express";
import Checkout from "./Checkout";
import CouponDataDatabase from "./CouponDataDatabase";
import ProductDataDatabase from "./ProductDataDatabase";

const app = express();
app.use(express.json());


app.post("/checkout", async function (req, res) {
	const input = req.body;
	try {
		const productData = new ProductDataDatabase();
		const couponData = new CouponDataDatabase();
		const checkout = new Checkout(productData, couponData);
		const output = await checkout.execute(input);
		res.json(output);
	} catch (error: any) {
		res.status(422).json({
			message: error.message
		});
	}
});
app.listen(3000);
