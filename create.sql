drop table cccat9.product;
drop table cccat9.coupon;
drop schema cccat9;

create schema cccat9;
create table cccat9.product (
	id_product integer primary key,
	description text,
	price numeric
);

insert into cccat9.product (id_product, description, price) values (1, 'A', 1000);
insert into cccat9.product (id_product, description, price) values (2, 'B', 5000);
insert into cccat9.product (id_product, description, price) values (3, 'C', 30);

create table cccat9.coupon (
	code text primary key,
	percentage numeric
);

insert into cccat9.coupon (code, percentage) values ('VALE20', 20);
