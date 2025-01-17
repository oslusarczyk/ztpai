import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { register } from "../../utils/network/user";
import { toast } from "react-toastify";

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

  const handleSubmit = async (values: RegisterFormValues) => {
    const { email, password } = values;
    try {
      await register(email, password);
      toast.success("Zostałeś pomyślnie zarejestrowany.");
      navigate("/");
    } catch (error: any) {
      if (error.status === 409) {
        toast.error("Ten email jest juz użyty");
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
            Zarejestruj się
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
