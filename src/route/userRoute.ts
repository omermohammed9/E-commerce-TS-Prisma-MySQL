import express from 'express';
import { UserController } from "../controller/UserController";
import { TYPES } from "../types/types";
import { Container } from "inversify";
import { validationMiddleware } from "../middleware/validation.middleware";
import { CreateUserDTO, UpdateUserDTO } from "../types/user.types";
import auth from "../middleware/auth";
import { isAdmin } from "../middleware/isAdmin";

export class userRoutes {
    public router: express.Router;
    private container: Container;

    constructor(container: Container) {
        this.container = container;
        this.router = express.Router();
        this.configureRoutes();
    }

    private configureRoutes(): void {
        const userController = this.container.get<UserController>(TYPES.UserController);
        
        // Public routes
        this.router.post('/signup', validationMiddleware(CreateUserDTO), (req, res) => userController.createUser(req, res));
        this.router.post('/login', (req, res) => userController.login(req, res));
        this.router.post('/refresh', (req, res) => userController.refresh(req, res));

        // Protected routes
        this.router.get('/', auth, isAdmin, (req, res) => userController.getAllUsers(req, res));
        this.router.get('/get/:id', auth, (req, res) => userController.getUserById(req, res));
        this.router.get('/getByEmail/:email', auth, isAdmin, (req, res) => userController.getUserByEmail(req, res));
        this.router.put('/update/:id', auth, validationMiddleware(UpdateUserDTO), (req, res) => userController.updateUser(req, res));
        this.router.delete('/delete/:id', auth, isAdmin, (req, res) => userController.deleteUser(req, res));
        this.router.post('/logout', auth, (req, res) => userController.logout(req, res));
        this.router.post('/changePassword/:id', auth, (req, res) => userController.changePassword(req, res));
    }
}



// export function registerUserRoutes(router: express.Router, container: Container): express.Router {
//     // Resolve UserController from the container
//     const userController = container.get<UserController>(TYPES.UserController);
//
//     // Set up routes using the resolved userController
//     router.get('/', (req, res) => userController.getAllUsers(req, res));
//    // router.post('/login', (req, res) => userController.login(req, res));
//     router.post('/signup', (req, res) => userController.createUser(req, res));
//     router.get('/get/:id', (req, res) => userController.getUserById(req, res));
//     router.put('/update/:id', (req, res) => userController.updateUser(req, res));
//     router.delete('/delete/:id', (req, res) => userController.deleteUser(req, res));
//
//     return router;
// }


// const userController = new UserController();
//
// router.get('/', userController.getAllUsers);
// router.post('/login', userController.login);
// router.post('/signup', userController.createUser);
// router.get('/get/:id', userController.getUserById);
// router.put('/update/:id', userController.updateUser);
// router.delete('/delete/:id', userController.deleteUser);
//
// export default router;
