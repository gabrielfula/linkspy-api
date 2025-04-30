import { Request, Response, NextFunction } from "express";

export const validateDto = (dto: any) => {
     return (req: Request, res: Response, next: NextFunction): any => {
          const dtoWithStrict = dto.strict();
          const parsed = dtoWithStrict.safeParse(req.body);

          if (!parsed.success) {
               const errorMessages = parsed.error.errors.map((err: any) => ({
                    message: err.message,
                    path: err.path,
               }));

               return res.status(400).json({
                    success: false,
                    message: "Dados inválidos",
                    errors: errorMessages,
               });
          }

          next();
     };
};
