import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import ApiError from '../utils/ApiError';
import pick from '../utils/pick';

const validate = (schema: Record<string, Joi.ObjectSchema>) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const validSchema = pick(schema, ['params', 'query', 'body']);
    const object = pick(req as unknown as Record<string, unknown>, Object.keys(validSchema));

    const { value, error } = Joi.compile(validSchema)
      .prefs({ errors: { label: 'key' }, abortEarly: false })
      .validate(object);

    if (error) {
      const errorMessage = error.details
        .map((detail) => detail.message)
        .join(', ');
      return next(new ApiError(400, errorMessage));
    }

    Object.assign(req, value);
    return next();
  };
};

export default validate;
