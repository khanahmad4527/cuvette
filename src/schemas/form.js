import * as Yup from "yup";

export const signUpSchema = Yup.object({
  firstname: Yup.string()
    .min(2)
    .max(50)
    .required("First name is required")
    .matches(/^[a-zA-Z\s]+$/, "First name must contain only alphabets"),

  lastname: Yup.string()
    .min(2)
    .max(50)
    .required("Last name is required")
    .matches(/^[a-zA-Z\s]+$/, "Last name must contain only alphabets"),

  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  mobileNumber: Yup.string()
    .required("Mobile number is required")
    .matches(
      /^[0-9]{10}$/,
      "Mobile number must be exactly 10 digits and contain only numbers"
    ),

  difficulty: Yup.string().required("Difficulty level is required"),
});
