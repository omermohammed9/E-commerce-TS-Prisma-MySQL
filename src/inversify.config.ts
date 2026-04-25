import { Container } from 'inversify';
import { IUserService } from './interfaces/IUserService';
import { UserService } from './services/UserService';
import { UserModel } from "./models/user.model";
import { TYPES } from "./types/types";
import { IUserModel } from "./interfaces/IUserModel";
import { UserController } from "./controller/UserController";
import { OrderModel } from "./models/order.model";
import { IOrderModel } from "./interfaces/IOrderModel";
import { OrderService } from "./services/OrderService";
import { IOrderService } from "./interfaces/IOrderService";
import { OrderController } from "./controller/OrderController";

import { ProductModel } from "./models/product.model";
import { IProductModel } from "./interfaces/IProductModel";
import { ProductService } from "./services/ProductService";
import { IProductService } from "./interfaces/IProductService";
import { ProductController } from "./controller/ProductController";

import { OrderDetailModel } from "./models/orderDetail.model";
import { IOrderDetailModel } from "./interfaces/IOrderDetailModel";
import OrderDetailService from "./services/OrderDetailService";
import { IOrderDetailService } from "./interfaces/IOrderDetailService";
import { OrderDetailController } from "./controller/OrderDetailController";
import { CronService } from "./services/CronService";

export const container: Container = new Container();

//Register bindings
container.bind<IUserModel>(TYPES.IUserModel).to(UserModel);
container.bind<IUserService>(TYPES.IUserService).to(UserService);
container.bind<UserController>(TYPES.UserController).to(UserController);
container.bind<IOrderModel>(TYPES.IOrderModel).to(OrderModel);
container.bind<IOrderService>(TYPES.IOrderService).to(OrderService);
container.bind<OrderController>(TYPES.Ordercontroller).to(OrderController);

// Product bindings
container.bind<IProductModel>(TYPES.IProductModel).to(ProductModel);
container.bind<IProductService>(TYPES.IProductService).to(ProductService);
container.bind<ProductController>(TYPES.ProductController).to(ProductController);

// OrderDetail bindings
container.bind<IOrderDetailModel>(TYPES.IOrderDetailModel).to(OrderDetailModel);
container.bind<IOrderDetailService>(TYPES.IOrderDetailService).to(OrderDetailService);
container.bind<OrderDetailController>(TYPES.OrderDetailController).to(OrderDetailController);

// Cron bindings
container.bind<CronService>(TYPES.CronService).to(CronService).inSingletonScope();
