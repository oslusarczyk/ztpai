import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const initialValues: LoginFormValues = { email: "", password: "" };

  const validationSchema = Yup.object({
    email: Yup.string().email("Niepoprawny e-mail").required("Wymagany e-mail"),
    password: Yup.string()
      .min(8, "Hasło musi mieć co najmniej 8 znaków")
      .required("Wymagane hasło"),
  });

  const handleSubmit = (values: LoginFormValues) => {
    console.log("Dane logowania:", values);
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

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Logowanie..." : "Zaloguj się"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
