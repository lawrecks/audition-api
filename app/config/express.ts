/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import cors from 'cors';
import routes from '../routes/v1';
import { Request, Response, NextFunction, Express } from 'express';

const expressConfig = (app: Express) => {
  const env = app.get('env');

  console.info('App is starting...');
  console.info(`Environment is ${env}`);
  console.info("Overriding 'Express' logger");

  app.disable('x-powered-by');
  app.use(cors());
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    );
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Authorization, Origin, Content-Type, Accept',
    );
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
  });

  app.use('/api/v1', routes);

  // catch 404 and forward to error handler
  app.use((req: Request, res: Response, next: NextFunction) => {
    const err: any = new Error('Route Not Found');
    err.status = 404;
    return next(err);
  });
  // error handlers

  // development error handler
  // will print stacktrace

  if (app.get('env') === 'development' || app.get('env') === 'test') {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      console.log(err);
      res.status(err.code || 500).json({
        status: err.status,
        code: err.code,
        message: err.message,
        data: err.data,
      });
    });
  }

  // production error handler
  // remove stacktrace
  app.use((err: any, req: Request, res: Response) =>
    res.status(err.code || 500).json({ message: err.message }),
  );
};

export default expressConfig;
