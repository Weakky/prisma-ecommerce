# prisma-ecommerce
A prisma e-commerce real-world complete example (including an RN app and a backoffice)

### This project is still under active development and not ready for production use.

# Introduction

This open-source project is meant, before everything else, to serve the needs of one of my client.
That is to say, an e-commerce app **which only purpose is to allow his customers to order products and then come and get their prepared order without waiting at all.**
The products that will eventually be ordered, are e-liquids and resistances (for a vape store located in France).

Although I'd be more than happy to accept contributions, please, keep in mind that I'm not gonna be able to allow contributions that would drive the project too far away from it's main purpose.

That being said, I refactored the whole project so that it allows to create pretty much any kind of product.

# The backoffice

![](https://image.ibb.co/kGBW3y/Capture_d_e_cran_2018_05_13_a_15_20_59.png)

It allows you to manage everything. Your products, your orders, your customers, everything.

# The react-native app

Some screenshots

Homepage view             |  Browsing product view          | Cart view
:-------------------------:|:-------------------------:|:-------------------------:
![](https://image.ibb.co/mzo0wJ/Simulator_Screen_Shot_i_Phone_6_2018_05_13_at_15_26_52.png)  | ![](https://image.ibb.co/hGoNAd/Simulator_Screen_Shot_i_Phone_6_2018_05_13_at_15_26_45.png) | ![](https://image.ibb.co/cu4CAd/Simulator_Screen_Shot_i_Phone_6_2018_05_13_at_15_31_16.png)

Almost everything on the react-native app is generated dynamically. The `E-LIQUIDE` and `ACCESORIES` menu that you see, are what I call `Categories`, that you can create on the back-office.

All the menus below, `Our categories`, `Our brands`, `Our nicotines rates` and `Our capacities` are respectively data you can configure from the backoffice as `Attributes`, `Brands`, and `Options`.

All of these properties *must* be categorized, so that they belong under their own categories. (eg: Here, the brands, attributes and options are all different under the `ACCESORIES` menu)
