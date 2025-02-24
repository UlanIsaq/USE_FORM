import { useState } from "react";
import styles from "./app.module.css";
import * as yup from "yup";

const initialData = {
  email: "",
  password: "",
  confirm_password: "",
};

const useStore = () => {
  const [formData, setFormData] = useState(initialData);
  return {
    getState: () => formData,
    setState: ({ target }) => {
      setFormData({
        ...formData,
        [target.name]: target.value,
      });
    },
  };
};

const EMAIL_REGEXP =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/;

const loginChangeSchema = yup
  .string()
  .matches(
    /^[\w_]*$/,
    "Неверный логин. Допустимые символы: буквы, цифры и нижнее подчёркивание"
  )
  .max(20, "Неверный логин. Должно быть не больше 20 символов");

const emailChangeSchema = yup
  .string()
  .matches(
    EMAIL_REGEXP,
    "Неверный логин. Допустимые символы: буквы, цифры и нижнее подчёркивание"
  );

const loginBlurSchema = yup
  .string()
  .min(
    3,
    "Th wrong login. Must be no shorter than 3 and no longer than 20 characters"
  );

const validateAndGetErrorMessage = (schema, value) => {
  let errorMessage = null;

  try {
    schema.validateSync(value);
  } catch ({ errors }) {
    errorMessage = errors
      .reduce((message, error) => message + error + "n", "")
      .trim();
  }

  return errorMessage;
};

export const App = () => {
  const { getState, setState } = useStore();
  const [error, setError] = useState(null);
  let newError = null;
  const onChange = ({ target }) => {
    setState({ target });

    if (target.name === "email") {
      newError = validateAndGetErrorMessage(emailChangeSchema, target.value);
    } else {
      newError = validateAndGetErrorMessage(loginChangeSchema, target.value);
    }

    setError(newError);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(getState());
  };

  const onBlur = ({ target }) => {
    newError = validateAndGetErrorMessage(loginBlurSchema, target.value);
    setError(newError);
  };

  return (
    <div className={styles.app}>
      <form onSubmit={onSubmit}>
        {error && <div className={styles.errorLabel}>{error}</div>}
        <input
          name="email"
          type="email"
          placeholder="email"
          onChange={onChange}
          onBlur={onBlur}
        />
        <input
          name="password"
          type="password"
          placeholder="password"
          onChange={onChange}
          onBlur={onBlur}
        />
        <input
          name="confirm_password"
          type="password"
          placeholder="confirm_password"
          onChange={onChange}
          onBlur={onBlur}
        />

        <button type="submit" disabled={!!error}>
          signIn
        </button>
      </form>
    </div>
  );
};
