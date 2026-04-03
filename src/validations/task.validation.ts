import Joi from 'joi';

const getTasks = {
    query: Joi.object().keys({
        customer_id: Joi.string(),
        technician_id: Joi.string(),
        job_id: Joi.string(),
        status: Joi.string(),
        task_type: Joi.string(),
    }),
};

const getTask = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
};

export default {
    getTasks,
    getTask,
};