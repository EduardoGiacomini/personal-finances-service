import { Router } from "express";

export interface Route {
  getRoute(): Router;
}
