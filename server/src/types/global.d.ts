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
    namespace Express {
        interface Request {
            user?: UserPayload;

        }
    }
}