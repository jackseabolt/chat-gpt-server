import { Request, Response } from "express";

export function wrapExpressRoute(
  fn: (req: Request<any, any, any, any>, res: Response) => Promise<any>
) {
  return async (req: Request, res: Response) => {
    try {
      await fn(req, res);
    } catch (error) {
      console.error("Route error:", error);
    }
  };
}
