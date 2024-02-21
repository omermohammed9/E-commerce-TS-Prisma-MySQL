import {User as PrismaUser} from "@prisma/client";

export interface UpdateUserAttributes {
    original: PrismaUser | null;
    updated: Partial<PrismaUser>  ;
}