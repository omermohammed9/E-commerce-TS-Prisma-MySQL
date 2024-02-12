import { Container } from 'inversify';
import { IUserService } from './interfaces/IUserService';
import { UserService } from './services/UserService';
import "reflect-metadata";
import {UserModel} from "./models/user.model";
import {TYPES} from "./types/types";
import {IUserModel} from "./interfaces/IUserModel";

const container = new Container();
container.bind<IUserService>(TYPES.IUserService).to(UserService);
container.bind<IUserModel>(TYPES.IUserModel).to(UserModel);


export { container };