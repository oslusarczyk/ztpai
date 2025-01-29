import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import styles from "../../styles/basic_styling.module.css";
import * as Yup from "yup";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const initialValues: LoginFormValues = {
    email: "admin@example.com",
    password: "test1234",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Niepoprawny e-mail").required("Wymagany e-mail"),
    password: Yup.string()
      .min(8, "Hasło musi mieć co najmniej 8 znaków")
      .required("Wymagane hasło"),
  });

  const handleSubmit = async (values: LoginFormValues) => {
    const { email, password } = values;
    try {
      await login(email, password);
    } catch (error: any) {
      if (error.status === 401) {
        toast.error("Podane dane są nieprawidłowe.");
      } else {
        toast.warning("Wystąpił nieoczekiwany błąd. Spróbuj ponownie.");
      }
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={styles.flexColumn}>
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
            Zaloguj się
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
