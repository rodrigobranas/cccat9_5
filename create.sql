create schema cccat9;
create table cccat9.product (
	id_product integer primary key,
	description text,
	price numeric,
	width integer,
	height integer,
	length integer,
	weight numeric,
	currency text
);

insert into cccat9.product (id_product, description, price, width, height, length, weight, currency) values (1, 'A', 1000, 100, 30, 10, 3, 'BRL');
insert into cccat9.product (id_product, description, price, width, height, length, weight, currency) values (2, 'B', 5000, 50, 50, 50, 22, 'BRL');
insert into cccat9.product (id_product, description, price, width, height, length, weight, currency) values (3, 'C', 30, 10, 10, 10, 0.9, 'BRL');
insert into cccat9.product (id_product, description, price, width, height, length, weight, currency) values (4, 'D', 100, 100, 30, 10, 3, 'USD');

create table cccat9.coupon (
	code text primary key,
	percentage numeric,
	expire_date timestamp
);

insert into cccat9.coupon (code, percentage, expire_date) values ('VALE20', 20, '2022-12-10T10:00:00');
insert into cccat9.coupon (code, percentage, expire_date) values ('VALE20_EXPIRED', 20, '2022-10-01T10:00:00');

create table cccat9.order (
	id_order serial primary key,
	coupon_code text,
	coupon_percentage numeric,
	code text,
	cpf text,
	email text,
	issue_date timestamp,
	freight numeric,
	total numeric,
	sequence integer
);

create table cccat9.item (
	id_order integer references cccat9.order (id_order),
	id_product integer references cccat9.product (id_product),
	price numeric,
	quantity integer,
	primary key (id_order, id_product)
);
