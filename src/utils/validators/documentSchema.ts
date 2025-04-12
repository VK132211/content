const Joi = require('joi') 
export const documentSchema = Joi.object({
    'object-key':Joi.string().required(),
    'bucket':Joi.string().required(),
    'action':Joi.string().valid('Upload','Downlaod').required(),
})