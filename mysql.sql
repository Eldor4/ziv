-- create database projectfour;
-- use projectfour;

-- create table users(
-- id int not null,
-- role text not null,
-- fname varchar(255) not null,
-- lmame varchar(255) not null,
-- userName varchar (255) not null,
-- password text not null,
-- city text not null,
-- street text not null,
-- primary key(id)
-- )


-- create table productcategory(
-- productcode int not null,
-- categoryname text not null

-- )
-- ALTER TABLE productcategory ADD primary key(productcode)

-- create table product(
-- productid int not null,
-- productname text not null,
-- categoryid int not null,
-- price int not null,
-- photo text not null,
-- foreign key (categoryid) references productcategory (productcode),
-- primary key (productid)
-- )

-- create table shoppingcart(
-- cartid int auto_increment,
-- userid int not null,
-- productiondate date not null,
-- foreign key (userid) references users (id),
-- primary key (cartid)
-- )

 -- create table cartitem(
--  id int auto_increment,
--  cartproductid int not null,
--  Amount int not null,
--  generalprice int not null,
--  cart int not null,
--  foreign key (cartproductid) references product (productid),
-- foreign key (cart) references shoppingcart (cartid),
--  primary key (id)
-- )

--  create table orders(
--  id int auto_increment,
--  userid int not null,
--  cart int not null,
--  amounttopay int not null,
--  city varchar (255) not null,
--  street varchar (255) not null,
--  orderdate date not null,  
--  fourdigits int not null,
--  foreign key (cart) references shoppingcart (cartid),
--  foreign key (userid) references users (id),
--  primary key(id)
-- )


-- ALTER TABLE users ADD status text not null;
-- ALTER TABLE shoppingcart ADD status text not null
-- ALTER TABLE productcategory ADD  photo text;
-- ALTER TABLE productcategory DROP photo;
-- ALTER TABLE orders DROP city;
-- ALTER TABLE orders ADD  city text not null;
--  ALTER TABLE orders DROP street;
--  ALTER TABLE orders ADD  street text not null

-- insert into productcategory(productcode,categoryname)
-- values(1,'shirts'),(2,'hats')

-- insert into product(productid, productname,categoryid, price, photo)
-- values(1111,'blah',1,22,'/public/3.jpeg'),
-- (1234,'b',1,12,'/public/4.jpeg'),
-- (2221,'bl',2,13,'/public/6.jpeg'),
-- (2222,'bla',2,13,'/public/7.jpeg'),
-- (2444,'bbla',2,13,'/public/9.jpg'),
-- (3333,'boola',1,13,'/public/5.jpg')



-- תיצור משתמש שבא לך  ותהפוך אותו לאדמין

-- update users set role='admin'
-- where id =?????????