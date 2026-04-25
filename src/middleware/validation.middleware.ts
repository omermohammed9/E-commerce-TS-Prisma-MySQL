import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { Request, Response, NextFunction, RequestHandler } from 'express';

export function validationMiddleware(type: any): RequestHandler {
    return async (req: Request, res: Response, next: NextFunction) => {
        const dto = plainToInstance(type, req.body);
        const errors = await validate(dto);

        if (errors.length > 0) {
            const message = errors.map((error: ValidationError) => {
                if (error.constraints) {
                    return Object.values(error.constraints);
                }
                if (error.children && error.children.length > 0) {
                    return error.children.map(child => Object.values(child.constraints || {})).join(', ');
                }
                return 'Invalid value';
            }).flat().join(', ');
            
            res.status(400).json({ error: message });
            return;
        }

        req.body = dto;
        next();
    };
}
