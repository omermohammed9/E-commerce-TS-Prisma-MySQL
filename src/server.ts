import "dotenv/config";
import "reflect-metadata";
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { userRoutes } from "./route/userRoute";
import { orderDetailRoutes } from "./route/orderDetailroute";
import { container } from "./inversify.config";
import { orderRoute } from "./route/orderRoute";
import { productRoutes } from "./route/productRoute";
import path from 'path';
import { TYPES } from "./types/types";
import { CronService } from "./services/CronService";
import logger from "./utils/logger";
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger';

// Initialize Cron Jobs
const cronService = container.get<CronService>(TYPES.CronService);
cronService.init();

// Rate Limiting
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many requests from this IP, please try again after 15 minutes'
});

const app = express();

// Security & Logging
app.use(helmet());

// Configure morgan to use winston
const stream = {
    write: (message: string) => logger.info(message.trim()),
};
app.use(morgan('combined', { stream }));

app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Apply rate limiting to auth routes
app.use('/users/login', authLimiter);
app.use('/users/signup', authLimiter);
app.use('/users/refresh', authLimiter);

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Routes
app.use('/users', new userRoutes(container).router);
app.use('/orders', new orderRoute(container).router);
app.use('/orderdetails', new orderDetailRoutes(container).router);
app.use('/products', new productRoutes(container).router);

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    logger.error(`${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`, { stack: err.stack });
    
    const status = err.status || err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(status).json({
        error: {
            message,
            status,
            ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
        }
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    logger.info(`Server is running on http://localhost:${PORT}`);
});

