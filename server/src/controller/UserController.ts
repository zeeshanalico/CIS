import { Request, Response } from 'express';
import UserService from '../services/UserService';
import { sendError, sendSuccess } from '../utils/responseUtils';
import { CustomError } from '../utils/CustomError';
import _ from 'lodash'
import bcrypt from 'bcrypt'
import { parseBoolean } from '../utils/parseBoolean';
class UserController {
  constructor(private readonly userService: UserService) { }

  async createUser(req: Request, res: Response): Promise<void> {
    const { name, email, password, role } = req.body
    try {
      const hashedPassword = await bcrypt.hash(password, 10)
      const newUser = await this.userService.createUser({ name, email, password: hashedPassword, role });
      sendSuccess(res, newUser, 'User created successfully');
    } catch (error) {
      sendError(res, error);
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.userService.getUserById(Number(req.params.id));
      if (!user) {
        throw new CustomError('User not found', 404);
      }
      sendSuccess(res, user, 'User fetched successfully');
    } catch (error) {
      sendError(res, error);
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const updatedUser = await this.userService.updateUser(Number(req.params.id), req.body);
      sendSuccess(res, updatedUser, 'User updated successfully');
    } catch (error) {
      sendError(res, error);
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const deletedUser = await this.userService.deleteUser(Number(req.params.id));
      sendSuccess(res, deletedUser, 'User deleted successfully');
    } catch (error) {
      sendError(res, error);
    }
  }

  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string, 10) || 1;
      const take = parseInt(req.query.limit as string, 10) || undefined;//for all results
      const skip = (page - 1) * (take || 0);//offset
      const available = parseBoolean(req.query.available as string) || false

      const users = await this.userService.getAllUsers({ skip, take, available });

      const filteredUsers = users.map((user) =>
        _.pick(user, [
          'id',
          'name',
          'email',
          'role',
          'is_active',
          'created_at',
          'updated_at',
        ])
      );
      sendSuccess(res, filteredUsers, 'Users fetched successfully');
    } catch (error) {
      sendError(res, error);
    }
  }
}

export default UserController;
