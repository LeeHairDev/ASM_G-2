import joi from "joi";

export const signUpSchema = joi.object({
  name: joi.string(),
  email: joi.string().email().required().messages({
    "string.email": "Email sai định dạng",
    "string.empty": "Email không được để trống",
    "any.required": "Trường Email là bắt buộc",
  }),
  password: joi.string().required().min(6).messages({
    "string.min": "Password phải có ít nhất {#limit} kí tự",
    "string.empty": "Password không được để trống",
    "any.required": "Trường Password là bắt buộc",
  }),
  confirmPassword: joi.string().valid(joi.ref("password")).required().messages({
    "any.only": "Password không trùng",
    "any.required": "Trường ConfirmPassword là bắt buộc",
  }),
});


export const signInSchema = joi.object({
  email: joi.string().email().required().messages({
    "string.email": "Email sai định dạng",
    "string.empty": "Email không được để trống",
    "any.required": "Trường Email là bắt buộc",
  }),
  password: joi.string().required().min(6).messages({
    "string.min": "Password phải có ít nhất {#limit} kí tự",
    "string.empty": "Password không được để trống",
    "any.required": "Trường Password là bắt buộc",
  }),
});
