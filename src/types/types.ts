import {OrderController} from "../controller/OrderController";

export const TYPES ={
    IUserModel: Symbol.for('IUserModel'),
    IUserService: Symbol.for('IUserService'),
    IOrderModel: Symbol.for('IOrderModel'),
    IOrderService: Symbol.for('IOrderService'),
    UserController: Symbol.for('UserController'),
    OrderController: Symbol.for('OrderController'),
}