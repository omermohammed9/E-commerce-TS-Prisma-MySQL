import "reflect-metadata";
import express from 'express';
import { userRoutes } from "./route/userRoute";
import { orderDetailRoutes } from "./route/orderDetailroute";
import { container } from "./inversify.config";
import { orderRoute } from "./route/orderRoute";
import { productRoutes } from "./route/productRoute";

const app = express();

app.use(express.json());

app.use('/users', new userRoutes(container).router);
app.use('/orders', new orderRoute(container).router);
app.use('/orderdetails', new orderDetailRoutes(container).router);
app.use('/products', new productRoutes(container).router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
