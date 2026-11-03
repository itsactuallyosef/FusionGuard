import path from "path";
import express, {
   type Request,
   type Response,
   type NextFunction,
} from "express";

import { config } from "./config";

import {
   BadRequestError,
   ForbiddenError,
   NotFoundError,
   UnauthorizedError,
} from "./customerrors.js";

import { getRecentAlerts } from "./indexer";

const app = express();

app.use(async (req: Request, res: Response, next: NextFunction) => {
   console.log("[DEBUG]:", req.method, req.url);
   next();
});

const errorHandler = (
   err: Error,
   req: Request,
   res: Response,
   next: NextFunction,
) => {
   let code = 500;
   let message = "Something went wrong on our end";

   switch (true) {
      case err instanceof BadRequestError:
         code = 400;
         message = err.message;
         break;
      case err instanceof UnauthorizedError:
         code = 401;
         message = err.message;
         break;
      case err instanceof ForbiddenError:
         code = 403;
         message = err.message;
         break;
      case err instanceof NotFoundError:
         code = 404;
         message = err.message;
         break;
   }

   if (code >= 500) {
      console.log(err);
   }

   res.status(code).send({ error: message });
};

app.get("/api/alerts", async (req: Request, res: Response) => {
   try {
      res.json(await getRecentAlerts());
   } catch (err) {
      console.error((err as any).cause ?? err);
      res.status(500).json({ error: (err as Error).message });
   }
});

app.use(express.json());

app.use("/alerts", express.static(path.join(process.cwd(), "src/app")));

app.use(errorHandler);

app.listen(config.api.port, () => {
   console.log(`Server is running at http://localhost:${config.api.port}`);
});
