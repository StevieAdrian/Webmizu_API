import Joi from 'joi';

const getCustomerProducts = {
    query: Joi.object().keys({
        customer_id: Joi.string(),
        product_catalog_id: Joi.string(),
        installation_technician_id: Joi.string(),
        status: Joi.string(),
    }),
};

const getCustomerProduct = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
};

export default {
    getCustomerProducts,
    getCustomerProduct,
};