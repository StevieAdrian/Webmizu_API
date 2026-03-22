import Joi from 'joi';

const getUser = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

const createUser = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    role: Joi.string().valid('user', 'admin'),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      email: Joi.string().email(),
      password: Joi.string().min(8),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

export default { getUser, createUser, updateUser, deleteUser };
