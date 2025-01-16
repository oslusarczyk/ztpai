import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { register } from "../../utils/network/user";
interface RegisterFormValues {
  email: string;
  password: string;
  password_confirmation: string;
}

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();

  const initialValues: RegisterFormValues = {
    email: "",
    password: "",
    password_confirmation: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Niepoprawny e-mail").required("Wymagany e-mail"),
    password: Yup.string()
      .min(8, "Hasło musi mieć co najmniej 8 znaków")
      .required("Wymagane hasło"),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref("password")], "Podane hasła się różnią")
      .required("Wymagane potwierdzenie hasła"),
  });

  const handleSubmit = async (
    values: RegisterFormValues,
    { setSubmitting, setErrors }: any
  ) => {
    const { email, password } = values;
    try {
      const responseData = await register(email, password);
      //   console.log(responseData);

      //   setErrorMessage(null); // Clear any previous error messages
      //   navigate("/login", {
      //     state: { message: "You have successfully registered!" },
      //   });
    } catch (error: any) {
      if (error.response?.status === 409) {
        // setErrorMessage("The email is already in use."); // Friendly message for 409 errors
      } else {
        // setErrorMessage("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="flex-column">
          <label htmlFor="email">E-mail</label>
          <Field type="email" name="email" placeholder="test@gmail.com" />
          <ErrorMessage
            name="email"
            component="div"
            className="error-message"
          />

          <label htmlFor="password">Hasło</label>
          <Field type="password" name="password" placeholder="hasło" />
          <ErrorMessage
            name="password"
            component="div"
            className="error-message"
          />

          <label htmlFor="password_confirmation">Potwierdź hasło</label>
          <Field
            type="password"
            name="password_confirmation"
            placeholder="potwierdź hasło"
          />
          <ErrorMessage
            name="password_confirmation"
            component="div"
            className="error-message"
          />

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Rejestrowanie..." : "Zarejestruj się"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
