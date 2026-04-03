import Joi from 'joi';

const getProductCatalogs = {
    query: Joi.object().keys({
        category_id: Joi.string(),
        name: Joi.string(),
        model: Joi.string(),
    }),
};

const getProductCatalog = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
};

export default {
    getProductCatalogs,
    getProductCatalog,
};