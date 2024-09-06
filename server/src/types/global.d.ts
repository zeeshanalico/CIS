// import { UserPayload } from "./UserPayload";
import {Express} from "express-serve-static-core";
import { UserPayload } from "./UserPayload";
import jwt from 'jsonwebtoken';
import {  Request } from "express";
import { UserPayload } from "./UserPayload";
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            // [key: string]: string | undefined
            ACCESS_TOKEN_SECRET: string;
            REFRESH_TOKEN_SECRET: string;
            NODE_ENV: string;
            PORT?: string;
        }
    }

    namespace Express {//if you use ts-node you will get the same error when you try to execute your .ts file because ts-node ignore .d.ts fies unless you add flag --files to package.json
        export interface Request {
            user?: UserPayload ;
        }
    }
}

// declare module 'express-serve-static-core' {
//    export interface Request {
//         user?: UserPayload | string;
//     }
// }
