# prisma-ecommerce
<p align="center">
  <img height=100" src="https://d1k5w7mbrh6vq5.cloudfront.net/images/cache/cc/5b/b9/cc5bb931b5f5fb8914609572a9dc51c1.png">
</p>
<p align="center">                                                                                                               <strong>A prisma e-commerce real-world fullstack example 🚀</strong>
</p>

Homepage view             |  Browsing product view          | Cart view            | Payment view
:-------------------------:|:-------------------------:|:-------------------------:|:-------------------------:
![](https://image.ibb.co/mzo0wJ/Simulator_Screen_Shot_i_Phone_6_2018_05_13_at_15_26_52.png)  | ![](https://image.ibb.co/hGoNAd/Simulator_Screen_Shot_i_Phone_6_2018_05_13_at_15_26_45.png) | ![](https://image.ibb.co/cu4CAd/Simulator_Screen_Shot_i_Phone_6_2018_05_13_at_15_31_16.png) | ![](https://image.ibb.co/gsN4ao/Simulator_Screen_Shot_i_Phone_6_2018_05_22_at_22_25_13.png)

### This project is still under active development and not ready for production use.


# Features

💁 **Beautiful, easily customizable react-native app**

💨 **GraphQL backend powered by [Prisma.io](https://www.prisma.io/)**

🏦 **Support several shops behind the same application**

💥 **Handcrafted backoffice to manage your e-commerce shop**

🔏 **Fully customizable products (variant system)**

💫 **Real-time updates for product availabilities**

💸 **Ready-to-sell Stripe integration (PCI compliant, including 3D Secure)**

🔔 **Push notification system to keep users updated when their orders are prepared**

❤️ **Made with love for the open-source community**



# The backoffice

![](https://image.ibb.co/kGBW3y/Capture_d_e_cran_2018_05_13_a_15_20_59.png)

### Manage your products, your orders, your customers.

# Philosophy

You'll quickly realize that there are no state-management library whatsoever. I'm actively militating against the wrong usage of those. Although a sweet Redux or MobX could have been used in some places (especially on the RN app), this app also acts as a showcase to promote vanilla React. Especially since the new Context API (Although I haven't updated React yet).

# Troubleshooting

<details><summary><strong>[Mobile][Android] Error: Network error: Network request failed.</strong></summary>
<p>

Android is running in an emulator.

The localhost is pointing to the environment in which the code is running. The emulator emulates a real device while the simulator is only imitating the device.

Therefore the localhost on Android is pointing to the emulated Android device. And not to the machine on which your server is running.

The solution is to replace <strong>localhost</strong> with the <strong>local IP address</strong> of your machine.

```
mobile/src/graphql/setupApollo.js


const httpLink = new HttpLink({
  uri: YOUR_LOCAL_IP,
});
```

</p>
</details>



