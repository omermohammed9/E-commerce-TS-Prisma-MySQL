import { Container } from 'inversify';
import { IUserService } from './interfaces/IUserService';
import { UserService } from './services/UserService';
import {UserModel} from "./models/user.model";
import {TYPES} from "./types/types";
import {IUserModel} from "./interfaces/IUserModel";
import {UserController} from "./controller/UserController";
import {OrderModel} from "./models/order.model";
import {IOrderModel} from "./interfaces/IOrderModel";
import {OrderService} from "./services/OrderService";
import {IOrderService} from "./interfaces/IOrderService";
import {OrderController} from "./controller/OrderController";

export const container = new Container();

container.bind<IUserModel>(TYPES.IUserModel).to(UserModel);
container.bind<IUserService>(TYPES.IUserService).to(UserService);
container.bind<UserController>(TYPES.UserController).to(UserController);
container.bind<IOrderModel>(TYPES.IOrderModel).to(OrderModel);
container.bind<IOrderService>(TYPES.IOrderService).to(OrderService);
container.bind<OrderController>(TYPES.OrderController).to(OrderController);
