import {inject, injectable} from "inversify";
import {TYPES} from "../types/types";
import {IUserService} from "../interfaces/IUserService";
import {findUpdateDifference} from "../utils/findUpdateDifference";


@injectable()
export class UserController {
   constructor(@inject(TYPES.IUserService) private userservice: IUserService) {};


    public async createUser(req: any, res: any) {
        try{
            const user = await this.userservice.createUser(req.body);
            res.status(201).json(user);
        }catch (error: any) {
            res.status(500).json({error: error.message});
        }
    };

    public async getAllUsers(req: any, res: any) {
        try {
            const users = await this.userservice.getAllUsers();
            res.status(200).json(users);
        } catch (error: Response | any) {
            // Just log the error and send a 500 status code
            console.error(error.message);
            if (!res.headersSent) {
                res.status(500).json({error: error.message});
            }
        }
    };

    public async getUserById(req: any, res: any) {
        try{
            const user = await this.userservice.getUserById(Number(req.params.id));
            res.status(200).json(user);
        }catch (error){
            res.status(404).json({error: `User not found`});
        }
    };

    public async getUserByEmail(req: any, res: any) {
       const email = req.params.email
       const user = await this.userservice.getUserByEmail(email);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({error: `User not found`});
        }
    };

    public async updateUser(req: any, res: any) {
        try{
            const {original, updated} = await this.userservice.updateUser(Number(req.params.id), req.body);
            //const changes = findUpdateDifference(original, updated);
            if (original === null) {
                throw new Error(`User not found`);
            }
            const changes = findUpdateDifference(original, updated);
            res.status(200).json({
                message: `User updated successfully`,
                original,
                updated,
                changes,
            });
        }catch (error){
            console.error(error);
            res.status(500).json({message: `An error occurred while updating the user.`});
        }
    };

    public async deleteUser(req: any, res: any) {
        const user = await this.userservice.deleteUser(Number(req.params.id));
        res.status(200).json(user);
    };

    public async login(req: any, res: any): Promise<void> {
        try {
            const {email, password} = req.body;
            const user = await this.userservice.login(email, password);
            res.status(200).json(user);
        } catch (error: any) {
            if (error.message === `User not found` || error.message === `Invalid password`) {
                    res.status(401).json({error: error.message});
            }
        }
    };
    public async changePassword(req: any, res: any) {
        try{
            const userId = Number(req.params.id);
            const {oldPassword, newPassword} = req.body;

            // Ensure all required information is provided
            if (!userId || !oldPassword || !newPassword) {
                return res.status(400).json({message: `Missing required information.`});
            }
            // Call the UserService to change the password
            const {message} = await this.userservice.changePassword(userId, oldPassword, newPassword);

            res.status(200).json(message);
        }catch (error: any) {
            console.error(error);
            let statusCode = 500; // Default to internal server error
            let errorMessage = `An error occurred while changing the password.`;

            if (error instanceof Error) {
                if (error.message ===  `User not found.` || error.message === `Invalid old password.`) {
                    statusCode = error.message === `User not found.` ? 404 : 401; // Set appropriate status codes
                    errorMessage = error.message; // Use the error message from the thrown error
                }
            }
            console.error(error);
            res.status(statusCode).json({message: errorMessage});
        }
    };
}

/*


export const createUser = async (req: Request, res: Response) => {
   // const userVariables = extractUserVariables(req.body);
    try {
        const { password, ...restOfUserVariables } = extractUserVariables(req.body);
        const passwordHash = hashPassword(password);
        const user = await prisma.user.create({
            data: {
                ...restOfUserVariables,
                passwordHash,
            },
        });
        const tokenOptions: jwt.SignOptions = {
            expiresIn: '120s',
            //issuer: 'Tsc-Prisma-MySQL',
            algorithm: 'HS256', // Default algorithm
        };
        const generateJWT = signJwt(user.id, tokenOptions);
        console.log(generateJWT);
        res.json({
            user,
            token: generateJWT
        });

    } catch (error: any) {
        res.status(500).send(error.message);
    }
};
export const login = async (req: Request, res: Response) => {
    const {email, password} = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: {email},
        });
        if (!user) {
            res.status(404).json({message: 'User not found'});
            return;
        }
        const passwordMatches = await bcrypt.compare(password, user.passwordHash);
        if (!passwordMatches) {
            res.status(401).json({message: 'Invalid password'});
            return;
        }
        const tokenOptions: jwt.SignOptions = {
            expiresIn: '10s',
            algorithm: 'HS256', // Default algorithm
        };
        const generateJWT = signJwt(user.id, tokenOptions);
        res.json({user, token: generateJWT});
    } catch (error: any) {
        res.status(500).send(error.message);
    }
};

export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: { id: Number(id) },
        });
        if (!user) {
            res.status(404).send(`User with ID ${id} not found`);
        }
    } catch (error: any) {
        if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
            return res.status(404).send(`User with ID ${id} not found`);
        }
        return res.status(500).send(error.message);
    }
};


export const updateUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    //const id = parseInt(userId, 10);
    const userVariables = extractUserUpdateVariables(req.body);
    try {
        if (isNaN(Number(id))) {
            res.status(400).json({ message: 'Invalid user ID format' });
            return;
        }
        const { password, ...restOfUserVariables } = userVariables;
        const updateData = {
            ...restOfUserVariables,
            ...(password && { passwordHash: hashPassword(password) }) // Conditionally add passwordHash if password is provided
        };

        const user: User = await prisma.user.update({
            where: { id: Number(id) },
            data: updateData,
        });
        res.json(user);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: "An unknown error occurred." });
        }
    }
};


export const deleteUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const softDelete = req.query.softDelete === 'true';  // Check if softDelete query parameter is set to true
    try {
        let user;
        if (softDelete) {
            // Soft delete: Update the user's isActive field to false instead of deleting the record
            user = await prisma.user.update({
                where: { id: Number(id) },
                data: { isActive: false },
            });
        } else {
            // Hard delete: Completely remove the user record from the database
            user = await prisma.user.delete({
                where: { id: Number(id) },
            });
        }
        res.json(user);
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
            // Handle the case where the user does not exist
            res.status(404).send(`User with ID ${id} not found`);
        } else {
            // Handle other kinds of errors
            // @ts-ignore
            res.status(500).send(error.message);
        }
    }
};
*/



