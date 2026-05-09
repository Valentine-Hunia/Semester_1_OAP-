import { Request, Response, NextFunction } from "express";
import { eventsService } from "../services/events.service.js";

export const eventsController = {
  getStats: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await eventsService.getStats();
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },
  getEvents: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const title = req.query.title as string;
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 5;

      const result = await eventsService.getEvents(title, page, limit);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },

  getById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await eventsService.getById(req.params.id as string);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },

  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await eventsService.create(req.body);
      res.status(201).json(result); // 201 Created [cite: 1301]
    } catch (err) {
      next(err);
    }
  },

  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await eventsService.delete(req.params.id as string);
      res.status(204).send(); // 204 No Content [cite: 752]
    } catch (err) {
      next(err);
    }
  }
};