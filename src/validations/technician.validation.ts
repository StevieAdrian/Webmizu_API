import Joi from 'joi';

const getTechnicians = {
    query: Joi.object().keys({
        name: Joi.string(),
        phone: Joi.string(),
    }),
};

const getTechnician = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
};

export default {
    getTechnicians,
    getTechnician,
};