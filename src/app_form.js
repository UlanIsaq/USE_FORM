import styles from "./app.module.css";
import { useForm } from "react-hook-form";

const EMAIL_REGEXP =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/;
export const App = () => {
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
  });

  const passwordProps = {
    minLength: {
      value: 3,
      message: "The login is too short",
    },
    maxLength: {
      value: 20,
      message: "the Login is too long",
    },
    pattern: {
      value: /^[\w_]*$/,
      message: "The login is not valid",
    },
  };

  const emailProps = {
    minLength: {
      value: 3,
      message: "The login is too short",
    },
    maxLength: {
      value: 20,
      message: "the Login is too long",
    },
    pattern: {
      value: EMAIL_REGEXP,

      message: "The login is not valid",
    },
  };
  const onSubmit1 = (formData) => {
    console.log(formData);
  };

  const error =
    errors.email?.message ||
    errors.password?.message ||
    errors.confirm_password?.message;

  return (
    <div className={styles.app}>
      <form onSubmit={handleSubmit(onSubmit1)}>
        {error && <div className={styles.errorLabel}>{error}</div>}
        <input
          name="email"
          type="email"
          placeholder="email"
          {...register("email", emailProps)}
        />
        <input
          name="password"
          type="password"
          placeholder="password"
          {...register("password", passwordProps)}
        />
        <input
          name="confirm_password"
          type="password"
          placeholder="confirm_password"
          {...register("confirm_password", passwordProps)}
        />

        <button type="submit" disabled={!!error}>
          signIn
        </button>
      </form>
    </div>
  );
};
