const Joi = require("joi");
export const documentSchema = Joi.object({
  data: Joi.object({
    attributes: Joi.object({
      action: Joi.string().valid("Upload", "Download").required(),
      bucket: Joi.string().required(),
      "object-key": Joi.string().required(),
    }).required(),
  }).required(),
});
