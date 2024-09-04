import { Role } from "./Roles";
export interface UserPayload {
    user_id: number;
    username: string;
    email: string;
    roles: Role[] | undefined
  }
  