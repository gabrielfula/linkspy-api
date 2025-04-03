import { Request, Response, NextFunction } from "express";

export const subdomainMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const host = req.headers.host || "";
    const subdomain = host.split(".")[0];

    (req as any).subdomain = subdomain;
    next();
};