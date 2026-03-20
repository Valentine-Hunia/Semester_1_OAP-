import { Request, Response, NextFunction } from "express";
import { eventsService } from "../services/events.service.js";

export const eventsController = {
  getEvents: (req: Request, res: Response, next: NextFunction) => {
    try {
      const title = req.query.title as string;
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 5;

      const result = eventsService.getEvents(title, page, limit);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },

  getById: (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = eventsService.getById(req.params.id as string);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },

  create: (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = eventsService.create(req.body);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  },

  delete: (req: Request, res: Response, next: NextFunction) => {
    try {
      eventsService.delete(req.params.id as string);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
};