import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./app.module.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const EMAIL_REGEXP =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/;

const sendForm = (formData) => {
  console.log(formData);
};

export const App = () => {
  const fieldSchema = yup.object().shape({
    password: yup
      .string()
      .matches(
        /^[\w_]*$/,
        "Неверный логин. Допустимые символы: буквы, цифры и нижнее подчёркивание"
      )

      .min(
        3,
        "Th wrong login. Must be no shorter than 3 and no longer than 20 characters"
      )
      .max(20, "Неверный логин. Должно быть не больше 20 символов"),
    email: yup
      .string()
      .matches(
        EMAIL_REGEXP,
        "Неверный логин. Допустимые символы: буквы, цифры и нижнее подчёркивание"
      )

      .min(
        3,
        "Th wrong login. Must be no shorter than 3 and no longer than 20 characters"
      )
      .max(20, "Неверный логин. Должно быть не больше 20 символов"),
    confirm_password: yup
      .string()
      .matches(
        /^[\w_]*$/,
        "Неверный логин. Допустимые символы: буквы, цифры и нижнее подчёркивание"
      )

      .min(
        3,
        "Th wrong login. Must be no shorter than 3 and no longer than 20 characters"
      )
      .max(20, "Неверный логин. Должно быть не больше 20 символов"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirm_password: "",
    },
    resolver: yupResolver(fieldSchema),
  });
  const error =
    errors.email?.message ||
    errors.password?.message ||
    errors.confirm_password?.message;
  return (
    <div className={styles.app}>
      <form onSubmit={handleSubmit(sendForm)}>
        {error && <div className={styles.errorLabel}>{error}</div>}
        <input
          name="email"
          type="email"
          placeholder="email"
          {...register("email")}
        />
        <input
          name="password"
          type="password"
          placeholder="password"
          {...register("password")}
        />
        <input
          name="confirm_password"
          type="password"
          placeholder="confirm_password"
          {...register("confirm_password")}
        />

        <button type="submit" disabled={!!error}>
          signIn
        </button>
      </form>
    </div>
  );
};
