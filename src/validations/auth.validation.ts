import Joi from 'joi';

const register = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    // disable top level domain, tar apus klo perlu
    email: Joi.string().required().email({ tlds: false }),
    password: Joi.string().required().min(8),
  }),
};

const login = {
  body: Joi.object().keys({
    // disable top level domain, tar apus klo perlu
    email: Joi.string().required().email({ tlds: false }),
    password: Joi.string().required(),
  }),
};

const refreshToken = {
  body: Joi.object().keys({
    refresh_token: Joi.string().required(),
  }),
};

export default { register, login, refreshToken };
