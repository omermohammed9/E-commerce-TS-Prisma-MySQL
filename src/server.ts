import "reflect-metadata";
import express from 'express';
import { userRoutes} from "./route/userRoute";
import orderRoute from "./route/orderRoute";
import orderDetailroute from "./route/orderDetailroute";
import {container} from "./inversify.config";

const app = express();

app.use(express.json());
app.use('/users', new userRoutes(container).router);
app.use('/orders', orderRoute);
app.use('orderdetails', orderDetailroute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
