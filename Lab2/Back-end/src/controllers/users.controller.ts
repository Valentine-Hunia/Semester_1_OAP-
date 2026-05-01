import { Request, Response, NextFunction } from "express";
import { usersService } from "../services/users.service.js";

export const usersController = {
  getAll: (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = usersService.getAll();
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },

  create: (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = usersService.create(req.body);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }
};