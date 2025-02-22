import { useState } from "react";
import styles from "./app.module.css";

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
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
export const App = () => {
  const { getState, setState } = useStore();
  const [error, setError] = useState(null);
  let newError = null;
  const onChange = ({ target }) => {
    setState({ target });
    if (target.name === "email") {
      if (!EMAIL_REGEXP.test(target.value)) {
        newError = "Неверный email";
      }
    } else {
      if (!/^[\w_]*$/.test(target.value)) {
        newError =
          "Неверный логин. Допустимые символы: буквы, цифры и нижнее подчёркивание";
      } else if (target.value.length > 20) {
        newError = "Неверный логин. Должно быть не больше 20 символов";
      }
    }

    setError(newError);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    console.log(getState());
  };

  const onBlur = () => {
    if (FormData.length < 3) {
      setError(
        "Th wrong login. Must be no shorter than 3 and no longer than 20 characters"
      );
    }
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
