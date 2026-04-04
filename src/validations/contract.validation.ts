import Joi from 'joi';

const getContracts = {
    query: Joi.object().keys({
        customer_product_id: Joi.string(),
        status: Joi.string(),
    }),
};

const getContract = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
};

export default {
    getContracts,
    getContract,
};
