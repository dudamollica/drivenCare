import joi from "joi";

export const appointmentSchema = joi.object({
  patientId: joi.number(),
  doctorId: joi.number().required(),
  date: joi.date().required(),
  hour: joi.number().integer().min(8).max(20).required(),
  cancel: joi.boolean().default(false),
  confirm: joi.boolean().default(false),
});
