import Joi from 'joi';

const getServiceLogs = {
    query: Joi.object().keys({
        expected_id: Joi.string(),
        customer_product_id: Joi.string(),
        technician_id: Joi.string(),
        service_type: Joi.string(),
        job_id: Joi.string(),
        task_id: Joi.string(),
    }),
};

const getServiceLog = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
};

export default {
    getServiceLogs,
    getServiceLog,
};