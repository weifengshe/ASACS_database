DROP DATABASE IF EXISTS cs6400sp17team021;

CREATE DATABASE cs6400sp17team021 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

USE cs6400sp17team021;



CREATE TABLE user
(
username varchar(250) NOT NULL,
password varchar(50) NOT NULL,
email varchar(250) NOT NULL,
fullname varchar(100) NOT NULL,
site_id int(16) unsigned NOT NULL,
PRIMARY KEY(username));

CREATE Table site
(
site_id int(16) unsigned NOT NULL AUTO_INCREMENT,
shortname varchar(250) NOT NULL,
streetaddress varchar(250) NOT NULL,
city varchar(250) NOT NULL,
state varchar(250) NOT NULL,
zipcode varchar(250) NOT NULL,
phonenumber varchar(250) NOT NULL,
PRIMARY KEY(site_id)
);

CREATE Table client
(
client_id int(16) unsigned NOT NULL AUTO_INCREMENT,
fullname varchar(250) NOT NULL,
idnumber varchar(250) NOT NULL,
description varchar(250) NOT NULL,
phonenumber varchar(250),
PRIMARY KEY(client_id)
);

Create Table request
(
id int(16) unsigned NOT NULL AUTO_INCREMENT,
requestedqty numeric(18,8),
fulfillqty numeric(18,8),
status varchar(250) NOT NULL,
item_id int(16) unsigned NOT NULL,
bank_id int(16) unsigned NOT NULL,
username varchar(250) NOT NULL,
PRIMARY KEY(id)
);


Create Table log
(
log_id int(16) unsigned NOT NULL AUTO_INCREMENT,
client_id int(16) unsigned NOT NULL,
site_id int(16) unsigned NOT NULL,
logtime datetime,
description varchar(250) NOT NULL,
PRIMARY KEY(log_id)
);


Create Table item
(
item_id int(16) unsigned NOT NULL AUTO_INCREMENT,
name varchar(250) NOT NULL,
numberofunits int(16) unsigned NOT NULL,
categoryname varchar(250) NOT NULL,
subcategoryname varchar(250) NOT NULL,
expirationdate datetime,
storagetype varchar(250) NOT NULL,
bank_id int(16) unsigned NOT NULL,
PRIMARY KEY(item_id)
);

Create Table foodbank
(
bank_id int(16) unsigned NOT NULL AUTO_INCREMENT,
site_id int(16) unsigned NOT NULL,
PRIMARY KEY(Bank_id)
);

Create Table soupkitchen
(
id int(16) unsigned NOT NULL AUTO_INCREMENT,
seatcount int(16) unsigned NOT NULL,
capacity int(16) unsigned NOT NULL,
description varchar(250) NOT NULL,
hoursoperation varchar(250) NOT NULL,
conditionsforuse varchar(250),
site_id int(16) unsigned NOT NULL,
PRIMARY KEY(id)
);

Create Table foodpantry
(
id int(16) unsigned NOT NULL AUTO_INCREMENT,
description varchar(250) NOT NULL,
hoursoperation varchar(250) NOT NULL,
conditionsforuse varchar(250),
site_id int(16) unsigned NOT NULL,
PRIMARY KEY(id)
);

CREATE TABLE shelter
(
id int(16) unsigned NOT NULL AUTO_INCREMENT,
description varchar(250) NOT NULL,
hoursoperation varchar(250) NOT NULL,
conditionsforuse varchar(250),
capacity_maleBunk int(16),
currentused_maleBunk int(16),
capacity_femaleBunk int(16),
currentused_femaleBunk int(16),
capacity_mixBunk int(16),
currentused_mixBunk int(16),
availableroom int(16),
site_id int(16) unsigned NOT NULL,
PRIMARY KEY(id)
);


Create Table waitlist
(
id int(16) unsigned NOT NULL AUTO_INCREMENT,
client_id int(16) unsigned NOT NULL,
site_id int(16) unsigned NOT NULL,
rank int(16) NOT NULL,
PRIMARY KEY(id)
);


ALTER TABLE user
  ADD CONSTRAINT fk_userTosite FOREIGN KEY (site_id) REFERENCES site (site_id);

ALTER TABLE request
  ADD CONSTRAINT fk_requestToitem FOREIGN KEY (item_id) REFERENCES item (item_id);

ALTER TABLE request
  ADD CONSTRAINT fk_requestTouser FOREIGN KEY (userName) REFERENCES user (userName);

ALTER TABLE item
  ADD CONSTRAINT fk_itemTobank FOREIGN KEY (bank_id) REFERENCES foodbank (bank_id);

ALTER TABLE soupkitchen
  ADD CONSTRAINT fk_kitchTosite FOREIGN KEY (site_id) REFERENCES site (site_id);

ALTER TABLE foodpantry
  ADD CONSTRAINT fk_pantryTosite FOREIGN KEY (site_id) REFERENCES site (site_id);

ALTER TABLE shelter
  ADD CONSTRAINT fk_shelterTosite FOREIGN KEY (site_id) REFERENCES site (site_id);


ALTER TABLE waitlist
  ADD CONSTRAINT fk_waitlistTosite FOREIGN KEY (site_id) REFERENCES site (site_id);

ALTER TABLE waitlist
  ADD CONSTRAINT fk_waitlistToclient FOREIGN KEY (client_id) REFERENCES client (client_id);

ALTER TABLE log
  ADD CONSTRAINT fk_logTosite FOREIGN KEY (site_id) REFERENCES site (site_id);

ALTER TABLE log
  ADD CONSTRAINT fk_logToclient FOREIGN KEY (client_id) REFERENCES client (client_id);





INSERT INTO site (shortname,streetaddress,city,state,zipcode,phonenumber)
VALUES ("site1", "121 E Broadway","San Diego","CA","85222","602 322 555")
,("site2", "122 E Drive","San Diego","CA","85223","622 322 556")
,("site3", "823 E Maple","San Diego","CA","85223","602 322 538");


INSERT INTO   client (fullname, idnumber,description, phonenumber)
VALUES ( "Joe Client1","123450","first time user","602 333 000")
, ( "Joe Client2","123451","first time user","602 333 001")
, ( "Joe Client3","123452","first time user","602 333 002")
, ( "Jane Client4","123453","first time user","602 333 003")
, ( "Joe Client5","123454","first time user","602 333 004")
, ( "Jane Client6","123455","first time user","602 333 005")
, ( "Joe Client7","123456","first time user","602 333 006")
, ( "Jane Client8","123457","first time user","602 333 007")
, ( "Joe Client9","123458","first time user","602 333 008")
, ( "Jane Client10","123459","first time user","602 333 009")
, ( "Joe Client11","123410","first time user","602 333 010")
, ( "Jane Client12","123411","first time user","602 333 011");


INSERT INTO user (username, password,email,fullname,site_id) VALUES
("emp1", "gatech123","employee1@gatech.edu","Site1 Employee1",1)
,("emp2", "gatech123","employee2@gatech.edu","Site2 Employee2",2)
,("emp3", "gatech123","employee3@gatech.edu","Site3 Employee3",3)
,("vol1", "gatech123","vol1@gatech.edu","Demo Volunteer1",1)
,("vol2", "gatech123","vol2@gatech.edu","Demo Volunteer2",2)
,("vol3", "gatech123","vol3@gatech.edu","Demo Volunteer3",3);



INSERT INTO foodpantry (id, description,hoursoperation,conditionsforuse,site_id)
VALUES ( 1, "pantry1","8 am - 6 pm","ready",1)
,( 3, "pantry3","8 am - 6 pm","ready",3);

INSERT INTO soupkitchen (id,seatcount,capacity,description,hoursoperation,conditionsforuse,site_id)
VALUES (2, 20,25,"soup2","8 am - 6 pm", "ready",2)
,( 3, 30,30,"soup3","9 am - 5 pm","ready",3);

INSERT INTO foodbank (site_id)
VALUES (1)
,(2)
,(3);

INSERT INTO shelter (id, description,hoursoperation, conditionsforuse, capacity_maleBunk,currentused_maleBunk,
    capacity_femaleBunk,currentused_femaleBunk,capacity_mixBunk,currentused_mixBunk,availableroom, site_id)
    VALUES (2, "shelter2", "8 am - 6 pm", "ready", 2,0,2,0,2,2,1,2)
    ,(3, "shelter3", "8 am - 5 pm", "ready", 2,1,2,2,2,1,0,3);


INSERT INTO waitlist (client_id,site_id,rank) VALUES
(1, 3, 1 ),
(3, 3, 2 ),
(5, 3, 3 ),
(6, 3, 4 ),
(2, 3, 5 ),
(4, 3, 6 ),

(2, 2, 1 ),
(4, 2, 2 ),
(7, 2, 3 ),
(8, 2, 4 ),
(5, 2, 5 ),
(6, 2, 6 );


INSERT INTO  log (client_id, site_id, logtime, description)
VALUES (1, 1, "2017-04-10", "profile created site 1")
,(1, 1, "2017-04-10", "visit pantry1 for site1")
,(1, 3, "2017-04-10", "visit pantry3 for site3")
,(2, 1, "2017-04-10", "profile created site 1")
,(2, 1, "2017-04-10", "visit pantry1 for site1")
,(2, 3, "2017-04-10", "visit pantry3 for site3")
,(3, 1, "2017-04-10", "profile created site 1")
,(3, 1, "2017-04-10", "visit pantry1 for site1")
,(3, 3, "2017-04-10", "visit pantry3 for site3")
,(4, 1, "2017-04-11", "profile created site 1")
,(4, 1, "2017-04-11", "visit pantry1 for site1")
,(4, 3, "2017-04-11", "visit pantry3 for site3")

,(5, 2, "2017-04-10", "profile created site 2")
,(5, 2, "2017-04-10", "visit soup2 for site2")
,(5, 3, "2017-04-10", "visit soup3 for site3")
,(6, 2, "2017-04-10", "profile created site 2")
,(6, 2, "2017-04-10", "visit soup2 for site2")
,(6, 3, "2017-04-10", "visit soup3 for site3")
,(7, 2, "2017-04-10", "profile created site2")
,(7, 2, "2017-04-10", "visit soup2 for site2")
,(7, 3, "2017-04-10", "visit soup3 for site3")
,(8, 2, "2017-04-11", "profile created site 2")
,(8, 2, "2017-04-11", "visit soup2 for site2")
,(8, 3, "2017-04-11", "visit soup3 for site3")

,(9, 3, "2017-04-11", "profile created site 3")
,(9, 3, "2017-04-11", "visit shelter3 for site3")
,(9, 3, "2017-04-11", "meal provided by site3")
,(10, 3, "2017-04-12", "profile created site 3")
,(10, 3, "2017-04-12", "visit shelter3 for site3")
,(10, 3, "2017-04-12", "meal provided by site3")
,(11, 3, "2017-04-12", "profile created site3")
,(11, 3, "2017-04-12", "visit shelter3 for site3")
,(11, 3, "2017-04-13", "meal provided by site3")
,(12, 3, "2017-04-13", "profile created site 3")
,(12, 3, "2017-04-14", "visit shelter3 for site3")
,(12, 3, "2017-04-14", "meal provided by site3");



INSERT INTO item
(name,
numberofunits,
categoryname,
subcategoryname,
expirationdate,
storagetype,
bank_id)
VALUES
("spinach", 10, "food", "vegetables", date_add(now(), INTERVAL 7 day), "refrigerated", 1)
,("fern", 8, "food", "vegetables", date_add(now(), INTERVAL 7 day), "refrigerated", 1)
,("kale", 20, "food", "vegetables", date_add(now(), INTERVAL 7 day), "refrigerated", 1)
,("cabbage", 15, "food", "vegetables", date_add(now(), INTERVAL 7 day), "refrigerated", 1)
,("celery", 18, "food", "vegetables", date_add(now(), INTERVAL 7 day), "refrigerated", 1)
,("lettuce", 25, "food", "vegetables", date_add(now(), INTERVAL 7 day), "refrigerated", 1)
,("taro", 8, "food", "vegetables", date_add(now(), INTERVAL 7 day), "refrigerated", 1)
,("chicory", 9, "food", "vegetables", date_add(now(), INTERVAL 7 day), "refrigerated", 1)
,("fennel", 13, "food", "vegetables", date_add(now(), INTERVAL 7 day), "refrigerated", 1)
,("broccoli", 14, "food", "vegetables", date_add(now(), INTERVAL 7 day), "refrigerated", 1)

,("walnut", 11, "food", "nuts", date_add(now(), INTERVAL 3 month), "drygoods",  1)
,("pecan", 12, "food", "nuts", date_add(now(), INTERVAL 3 month), "drygoods",  1)
,("cashew", 13, "food", "nuts", date_add(now(), INTERVAL 3 month), "drygoods",  1)
,("pistachio", 14, "food", "nuts", date_add(now(), INTERVAL 3 month), "drygoods",  1)
,("hazelnut", 15, "food", "nuts", date_add(now(), INTERVAL 3 month), "drygoods",  1)
,("chestnut", 16, "food", "nuts", date_add(now(), INTERVAL 3 month), "drygoods",  1)
,("brazilnuts", 17, "food", "nuts", date_add(now(), INTERVAL 3 month), "drygoods",  1)
,("macadamia", 18, "food", "nuts", date_add(now(), INTERVAL 3 month), "drygoods",  1)
,("pinenut", 19, "food", "nuts", date_add(now(), INTERVAL 3 month), "drygoods",  1)
,("almond", 20, "food", "nuts", date_add(now(), INTERVAL 3 month), "drygoods",  1)

,("ketchup", 11, "food", "sauce", date_add(now(), INTERVAL 1 year), "drygoods",  1)
,("mustard", 12, "food", "sauce", date_add(now(), INTERVAL 1 year), "drygoods",  1)
,("vaganmayonnaise", 13, "food", "sauce", date_add(now(), INTERVAL 1 year), "drygoods",  1)
,("soysause", 14, "food", "sauce", date_add(now(), INTERVAL 1 year), "drygoods",  1)
,("tahini", 15, "food", "sauce", date_add(now(), INTERVAL 1 year), "drygoods",  1)
,("hotsause", 16, "food", "sauce", date_add(now(), INTERVAL 1 year), "drygoods",  1)
,("bbqsause", 17, "food", "sauce", date_add(now(), INTERVAL 1 year), "drygoods",  1)
,("sourcream", 18, "food", "sauce", date_add(now(), INTERVAL 1 year), "drygoods",  1)
,("veganworcestershire", 19, "food", "sauce", date_add(now(), INTERVAL 1 year), "drygoods",  1)
,("horseradish", 20, "food", "sauce", date_add(now(), INTERVAL 1 year), "drygoods",  1)

,("sprite", 11, "food", "drink", date_add(now(), INTERVAL 1 year), "refrigerated", 1)
,("fanta", 12, "food", "drink", date_add(now(), INTERVAL 1 year), "refrigerated", 1)
,("melloyello", 13, "food", "drink", date_add(now(), INTERVAL 1 year), "refrigerated", 1)
,("cocacola", 14, "food", "drink", date_add(now(), INTERVAL 1 year), "refrigerated", 1)
,("moutainview", 15, "food", "drink", date_add(now(), INTERVAL 1 year), "refrigerated", 1)
,("drpepper", 16, "food", "drink", date_add(now(), INTERVAL 1 year), "refrigerated", 1)
,("cheerwine", 17, "food", "drink", date_add(now(), INTERVAL 1 year), "refrigerated", 1)
,("pepsi", 18, "food", "drink", date_add(now(), INTERVAL 1 year), "refrigerated", 1)
,("redbull", 19, "food", "drink", date_add(now(), INTERVAL 1 year), "refrigerated", 1)
,("lilt", 20, "food", "drink", date_add(now(), INTERVAL 1 year), "refrigerated", 1)

,("beef", 11, "food", "meat", date_add(now(), INTERVAL 1 year), "frozen",  1)
,("veal", 12, "food", "meat", date_add(now(), INTERVAL 1 year), "frozen",  1)
,("pork", 13, "food", "meat", date_add(now(), INTERVAL 1 year), "frozen",  1)
,("lamb", 14, "food", "meat", date_add(now(), INTERVAL 1 year), "frozen",  1)
,("goat", 15, "food", "meat", date_add(now(), INTERVAL 1 year), "frozen",  1)
,("horse", 16, "food", "meat", date_add(now(), INTERVAL 1 year), "frozen",  1)
,("venison", 17, "food", "meat", date_add(now(), INTERVAL 1 year), "frozen",  1)

,("goatcheese", 11, "food", "dairy",date_add(now(), INTERVAL 1 year), "refrigerated",  1)
,("creamcheese", 12, "food", "dairy",date_add(now(), INTERVAL 1 year), "refrigerated",  1)
,("cheddarcheese", 13, "food", "dairy",date_add(now(), INTERVAL 1 year), "refrigerated",  1)
,("brie", 14, "food", "dairy",date_add(now(), INTERVAL 1 year), "refrigerated",  1)
,("mozzarella", 15, "food", "dairy",date_add(now(), INTERVAL 1 year), "refrigerated",  1)
,("bluecheese", 16, "food", "dairy",date_add(now(), INTERVAL 1 year), "refrigerated",  1)
,("goudacheese", 17, "food", "dairy",date_add(now(), INTERVAL 1 year), "refrigerated",  1)
,("feta", 18, "food", "dairy",date_add(now(), INTERVAL 1 year), "refrigerated",  1)
,("americancheese", 19, "food", "dairy",date_add(now(), INTERVAL 1 year), "refrigerated",  1)
,("swisscheese", 20, "food", "dairy",date_add(now(), INTERVAL 1 year), "refrigerated",  1)

,("toothbrush", 21, "supply", "personal hygiene",date_add(now(), INTERVAL 1 year),  "drygoods",  1)
,("toothpaste", 22, "supply", "personal hygiene",date_add(now(), INTERVAL 1 year),  "drygoods",  1)
,("deodorant", 23, "supply", "personal hygiene",date_add(now(), INTERVAL 1 year),  "drygoods",  1)
,("babywipe", 24, "supply", "personal hygiene",date_add(now(), INTERVAL 1 year),  "drygoods",  1)
,("detergent", 25, "supply", "personal hygiene",date_add(now(), INTERVAL 1 year),  "drygoods",  1)

,("shirt", 20, "supply", "clothing", date_add(now(), INTERVAL 2 year), "drygoods", 1)
,("pants", 21, "supply", "clothing", date_add(now(), INTERVAL 2 year), "drygoods", 1)
,("hat", 22, "supply", "clothing", date_add(now(), INTERVAL 2 year), "drygoods", 1)
,("shirts", 23, "supply", "clothing", date_add(now(), INTERVAL 2 year), "drygoods", 1)
,("coat", 24, "supply", "clothing", date_add(now(), INTERVAL 2 year), "drygoods", 1)

,("potato", 11, "food", "vegetables", date_add(now(), INTERVAL 3 month), "refrigerated",  2)
,("carrot", 12, "food", "vegetables", date_add(now(), INTERVAL 3 month), "refrigerated",  2)
,("turnip", 13, "food", "vegetables", date_add(now(), INTERVAL 3 month), "refrigerated",  2)
,("parsnip", 14, "food", "vegetables", date_add(now(), INTERVAL 3 month), "refrigerated",  2)
,("rutabaga", 15, "food", "vegetables", date_add(now(), INTERVAL 3 month), "refrigerated",  2)
,("radish", 16, "food", "vegetables", date_add(now(), INTERVAL 3 month), "refrigerated",  2)
,("galic", 17, "food", "vegetables", date_add(now(), INTERVAL 3 month), "refrigerated",  2)
,("kohlrabi", 18, "food", "vegetables", date_add(now(), INTERVAL 3 month), "refrigerated",  2)
,("wasabi", 19, "food", "vegetables", date_add(now(), INTERVAL 3 month), "refrigerated",  2)
,("scallion", 20, "food", "vegetables", date_add(now(), INTERVAL 3 month), "refrigerated",  2)

,("barley", 11, "food", "grains", date_add(now(), INTERVAL 1 year), "drygoods",  2)
,("oats", 12, "food", "grains", date_add(now(), INTERVAL 1 year), "drygoods",  2)
,("rice", 13, "food", "grains", date_add(now(), INTERVAL 1 year), "drygoods",  2)
,("rye", 14, "food", "grains", date_add(now(), INTERVAL 1 year), "drygoods",  2)
,("spelt", 15, "food", "grains", date_add(now(), INTERVAL 1 year), "drygoods",  2)
,("teff", 16, "food", "grains", date_add(now(), INTERVAL 1 year), "drygoods",  2)
,("wheat", 17, "food", "grains", date_add(now(), INTERVAL 1 year), "drygoods",  2)
,("wildrice", 18, "food", "grains", date_add(now(), INTERVAL 1 year), "drygoods",  2)
,("rye", 19, "food", "grains", date_add(now(), INTERVAL 1 year), "drygoods",  2)
,("millet", 20, "food", "grains", date_add(now(), INTERVAL 1 year), "drygoods",  2)

,("ketchup", 21, "food", "sauce", date_add(now(), INTERVAL 1 year), "drygoods",  2)
,("mustard", 22, "food", "sauce", date_add(now(), INTERVAL 1 year), "drygoods",  2)
,("vaganmayonnaise", 23, "food", "sauce", date_add(now(), INTERVAL 1 year), "drygoods",  2)
,("soysause", 24, "food", "sauce", date_add(now(), INTERVAL 1 year), "drygoods",  2)
,("tahini", 25, "food", "sauce", date_add(now(), INTERVAL 1 year), "drygoods",  2)
,("hotsause", 26, "food", "sauce", date_add(now(), INTERVAL 1 year), "drygoods",  2)
,("bbqsause", 27, "food", "sauce", date_add(now(), INTERVAL 1 year), "drygoods",  2)
,("sourcream", 28, "food", "sauce", date_add(now(), INTERVAL 1 year), "drygoods",  2)
,("veganworcestershire", 29, "food", "sauce", date_add(now(), INTERVAL 1 year), "drygoods",  2)
,("horseradish", 30, "food", "sauce", date_add(now(), INTERVAL 1 year), "drygoods",  2)

,("applejuice", 11, "food", "juice", date_add(now(), INTERVAL 1 year),  "refrigerated", 2)
,("lemonjuice", 12, "food", "juice", date_add(now(), INTERVAL 1 year),  "refrigerated", 2)
,("limjuice", 13, "food", "juice", date_add(now(), INTERVAL 1 year),  "refrigerated", 2)
,("orangejuice", 14, "food", "juice", date_add(now(), INTERVAL 1 year),  "refrigerated", 2)
,("pineapplejuice", 15, "food", "juice", date_add(now(), INTERVAL 1 year),  "refrigerated", 2)
,("pruncejuice", 16, "food", "juice", date_add(now(), INTERVAL 1 year),  "refrigerated", 2)
,("beetjuice", 17, "food", "juice", date_add(now(), INTERVAL 1 year),  "refrigerated", 2)
,("carrotjuice", 18, "food", "juice", date_add(now(), INTERVAL 1 year),  "refrigerated", 2)
,("cucumberjuice", 19, "food", "juice", date_add(now(), INTERVAL 1 year),  "refrigerated", 2)
,("fmelonjuice", 20, "food", "juice", date_add(now(), INTERVAL 1 year),  "refrigerated", 2)

,("crab", 11, "food", "seafood", date_add(now(), INTERVAL 1 year),"frozen",  2)
,("catfish", 12, "food", "seafood", date_add(now(), INTERVAL 1 year),"frozen",  2)
,("eel", 13, "food", "seafood", date_add(now(), INTERVAL 1 year),"frozen",  2)
,("tilapia", 14, "food", "seafood", date_add(now(), INTERVAL 1 year),"frozen",  2)
,("octopus", 15, "food", "seafood", date_add(now(), INTERVAL 1 year),"frozen",  2)
,("trout", 16, "food", "seafood", date_add(now(), INTERVAL 1 year),"frozen",  2)
,("sundine", 17, "food", "seafood", date_add(now(), INTERVAL 1 year),"frozen",  2)
,("bluefish", 18, "food", "seafood", date_add(now(), INTERVAL 1 year),"frozen",  2)
,("shrimp", 19, "food", "seafood", date_add(now(), INTERVAL 1 year),"frozen",  2)
,("oyster", 20, "food", "seafood", date_add(now(), INTERVAL 1 year),"frozen",  2)

,("chickenegg", 21, "food", "dairy", date_add(now(), INTERVAL 1 month),"frozen",  2)
,("duckegg", 22, "food", "dairy", date_add(now(), INTERVAL 1 month),"frozen",  2)
,("eggroll", 23, "food", "dairy", date_add(now(), INTERVAL 1 year),"frozen",  2)
,("eggnog", 24, "food", "dairy", date_add(now(), INTERVAL 1 year),"frozen",  2)
,("fizze", 25, "food", "dairy", date_add(now(), INTERVAL 1 year),"frozen",  2)
,("pastas", 26, "food", "dairy", date_add(now(), INTERVAL 1 year),"frozen",  2)
,("eggpowder", 27, "food", "dairy", date_add(now(), INTERVAL 1 year),"frozen",  2)
,("diredegg", 28, "food", "dairy", date_add(now(), INTERVAL 1 year),"frozen",  2)
,("eggsolid", 29, "food", "dairy", date_add(now(), INTERVAL 1 year),"frozen",  2)
,("eggsubstitute", 30, "food", "dairy", date_add(now(), INTERVAL 1 year),"frozen",  2)

,("tent", 5, "supply", "shelter", date_add(now(), INTERVAL 10 year),"drygoods",  2)
,("sleepingbag", 10, "supply", "shelter", date_add(now(), INTERVAL 10 year),"drygoods",  2)
,("blanket", 15, "supply", "shelter", date_add(now(), INTERVAL 10 year),"drygoods",  2)
,("raincoat", 20, "supply", "shelter", date_add(now(), INTERVAL 10 year),"drygoods",  2)
,("winterjacket", 25, "supply", "shelter", date_add(now(), INTERVAL 10 year),"drygoods",  2)

,("paperproduct", 30, "supply", "other", date_add(now(), INTERVAL 10 year),"drygoods",  2)
,("toiletpaper", 40, "supply", "other", date_add(now(), INTERVAL 10 year),"drygoods",  2)
,("petfood", 50, "supply", "other", date_add(now(), INTERVAL 10 year),"drygoods",  2)
,("battery", 100, "supply", "other", date_add(now(), INTERVAL 10 year),"drygoods",  2)
,("bucket", 20, "supply", "other", date_add(now(), INTERVAL 10 year),"drygoods",  2)

,("chicken", 6, "food", "meat", date_add(now(), INTERVAL -10 day),"refrigerated",  3)
,("beef", 4, "food", "meat", date_add(now(), INTERVAL -10 day), "frozen",  3)
,("veal", 5, "food", "meat", date_add(now(), INTERVAL -10 day), "frozen",  3)
,("pork", 7, "food", "meat", date_add(now(), INTERVAL -10 day), "frozen",  3)
,("lamb", 8, "food", "meat", date_add(now(), INTERVAL -10 day), "frozen",  3)
,("goat", 9, "food", "meat", date_add(now(), INTERVAL -10 day), "frozen",  3)

,("milk", 6, "food","dairy",date_add(now(), INTERVAL -10 day), "refrigerated",  3)
,("egg", 6, "food","dairy",date_add(now(), INTERVAL -10 day), "refrigerated",  3)
,("americancheese", 6, "food","dairy",date_add(now(), INTERVAL -10 day), "refrigerated",  3)
,("swisscheese", 6, "food","dairy",date_add(now(), INTERVAL -10 day), "refrigerated",  3)
,("cheddarcheese", 6, "food","dairy",date_add(now(), INTERVAL -10 day), "refrigerated",  3);

INSERT INTO request (requestedqty, fulfillqty, status, item_id, bank_id, username)
VALUES (10, 0, "pending", 70, 2, "emp1")
,(4, 0, "pending", 140, 3, "emp1")

,(10, 0, "pending",3, 1, "emp2")
,(4, 0, "pending", 142, 3, "emp2")
,(7, 0, "pending", 7, 1, "emp2")

,(10, 0, "pending", 2, 1, "emp3")
,(10, 0, "pending", 71, 2, "emp3")
,(7, 0, "pending", 8, 1, "emp3")
,(7, 0, "pending", 100, 2, "emp3")


,(10, 0, "pending", 90, 2, "vol1")
,(4, 0, "pending", 143, 3, "vol1")

,(10, 0, "pending", 3, 1, "vol2")
,(4, 0, "pending", 144, 3, "vol2")
,(7, 0, "pending", 7, 1, "vol2")


,(10, 0, "pending", 2, 1, "vol3")
,(10, 0, "pending", 111, 2, "vol3")
,(7, 0, "pending", 8, 1, "vol3")
,(7, 0, "pending", 115, 2, "vol3")

,(5, 5, "closed", 91, 2, "emp1")
,(3, 3, "closed", 92, 2, "emp1")
,(6, 6, "closed", 93, 2, "emp1")
,(4, 4, "closed", 148, 3, "emp1")

,(3, 3, "closed", 3, 1, "emp2")
,(2, 2, "closed", 148,3, "emp2")
,(4, 4, "closed", 7, 1, "emp2")
,(6, 6, "closed", 5, 1, "emp2")

,(6, 6, "closed", 2, 1, "emp3")
,(8, 8, "closed", 85, 2, "emp3")
,(2, 2, "closed", 8, 1, "emp3")
,(5, 5, "closed", 75, 2, "emp3")

,(5, 5, "closed", 84, 2, "vol1")
,(3, 3, "closed", 74, 2, "vol1")
,(6, 6, "closed", 72, 2, "vol1")
,(4, 4, "closed", 145, 3, "vol1")

,(3, 3, "closed", 4,  1, "vol2")
,(2, 2, "closed", 138, 3, "vol2")
,(4, 4, "closed", 7, 1, "vol2")
,(6, 6, "closed", 5, 1, "vol2")

,(6, 6, "closed", 2, 1, "vol3")
,(8, 8, "closed", 121, 2, "vol3")
,(2, 2, "closed", 8, 1, "vol3")
,(5, 5, "closed", 115, 2, "vol3");
