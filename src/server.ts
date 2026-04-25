import "reflect-metadata";
import express from 'express';
import cors from 'cors';
import { userRoutes } from "./route/userRoute";
import { orderDetailRoutes } from "./route/orderDetailroute";
import { container } from "./inversify.config";
import { orderRoute } from "./route/orderRoute";
import { productRoutes } from "./route/productRoute";

const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.json());

app.use('/users', new userRoutes(container).router);
app.use('/orders', new orderRoute(container).router);
app.use('/orderdetails', new orderDetailRoutes(container).router);
app.use('/products', new productRoutes(container).router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
