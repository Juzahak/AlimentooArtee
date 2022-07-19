import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../../public/styles/Login.module.css";

const Login = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    try {
      await axios.post("/api/login", {
        username,
        password,
      });
      router.push("/admin");
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>Administrador</h1>
        <input
          placeholder="Usuário"
          className={styles.input}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="Senha"
          type="password"
          className={styles.input}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleClick} className={styles.button}>
          Entrar!
        </button>
        {error && <span className={styles.error}>Usuário ou senha incorretos!</span>}
      </div>
    </div>
  );
};

export default Login;
