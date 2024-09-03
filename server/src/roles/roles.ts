import { InternalUserRole, UserRole } from "@prisma/client";

export type Role = InternalUserRole | UserRole;

export const Roles = {
    SUPER_ADMIN: 'SUPER_ADMIN' as InternalUserRole,
    ADMIN: 'ADMIN' as UserRole,
    USER: 'USER' as UserRole
};
