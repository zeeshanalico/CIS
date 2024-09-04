import { Request, Response } from 'express';
import UserService from '../services/UserService';
import { sendError, sendSuccess } from '../utils/responseUtils';
import { CustomError } from '../utils/CustomError';
import _ from 'lodash'

class UserController {
  constructor(private readonly userService: UserService) { }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const newUser = await this.userService.createUser(req.body);
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
      const take = parseInt(req.query.limit as string, 10) || 10;
      const skip = (page - 1) * take;//offset

      const users = await this.userService.getAllUsers({ skip, take });

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
