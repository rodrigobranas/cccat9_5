<script setup lang="ts">
import { inject, onMounted, reactive, ref } from 'vue';
import axios from "axios";
import Order from './domain/Order';
import CheckoutGatewayHttp from './infra/gateway/CheckoutGatewayHttp';
import CheckoutGateway from './infra/gateway/CheckoutGateway';

	const products = reactive([
		{ idProduct: 1, description: "A", price: 1000 },
		{ idProduct: 2, description: "B", price: 5000 },
		{ idProduct: 3, description: "C", price: 30 }
	]);

	const order = reactive(new Order("987.654.321-00"));
	const message = ref("");

	

	const getProductById = function (idProduct: number) {
		return products.find((product: any) => product.idProduct === idProduct);
	}

	const formatMoney = function (amount: number) {
		return new Intl.NumberFormat("en-IN", { style: "currency", currency: "USD" }).format(amount);
	}

	const checkoutGateway = inject("checkoutGateway") as CheckoutGateway;

	const confirm = async function (order: any) {
		const orderData = await checkoutGateway.checkout(order);
		order.code = orderData.code;
		order.total = orderData.total;
		message.value = "Success";
	}

	onMounted(async () => {
		const productsData = await checkoutGateway.getProducts();
		products.push(...productsData);
	});
</script>

<template>
	<div class="title">Checkout</div>
	<div v-for="product in products">
		<span class="product-description">{{ product.description }}</span>
		<span class="product-price">{{ formatMoney(product.price) }}</span>
		<button class="product-add-button" @click="order.addItem(product)">add</button>
	</div>
	<div class="total">{{ formatMoney(order.getTotal()) }}</div>
	<div v-for="item in order.items">
		<span class="item-description">{{ getProductById(item.idProduct)?.description }}</span>
		<span class="item-quantity">{{ item.quantity }}</span>
		<button class="item-increase-button" @click="order.increaseItem(item.idProduct)">+</button>
		<button class="item-decrease-button" @click="order.decreaseItem(item.idProduct)">-</button>
	</div>
	<button class="confirm" @click="confirm(order)">confirm</button>
	<div class="message">{{ message }}</div>
	<div class="order-code">{{ order.code }}</div>
	<div class="order-total">{{ order.total }}</div>
</template>

<style scoped>
</style>
