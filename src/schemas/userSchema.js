import joi from "joi";

export const patientSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
});

export const doctorSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  specialty: joi.string().required(),
  location: joi.string().required(),
});
