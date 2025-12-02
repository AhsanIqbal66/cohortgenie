import * as yup from "yup";
const passwordRegex = /(?=.*[a-z])(?=.*[A-Z])/;

export const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .matches(
      passwordRegex,
      "Password must contain at least one uppercase and one lowercase letter"
    )
    .required("New Password is required"),
});
export const SignupSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .matches(
      passwordRegex,
      "Password must contain at least one uppercase and one lowercase letter"
    )
    .required("New Password is required"),
});
export const ForgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
});

export const ResetPasswordSchema = yup.object().shape({
  newPassword: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .matches(
      passwordRegex,
      "Password must contain at least one uppercase and one lowercase letter"
    )
    .required("New Password is required"),
  cpassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Confirm Password must match the Password")
    .required("Confirm Password is required"),

  token: yup.string().nullable(),
});
export const Varify2FASchema = yup.object().shape({
  otp: yup.number().required("Number is required"),
});
export const VarifyCodeSchema = yup.object().shape({
  varifycode: yup.string().required("Number is required"),
});
