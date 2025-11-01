import { Box, Typography } from "@mui/material";
import { useAuth } from "../../auth/useAuth";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Eye, EyeClosed } from "lucide-react";
import InputText from "../../components/InputText";

import styles from "./login.module.css";
import Logo from "../../components/Logo";
import CustomButton from "../../components/CustomButtom";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await login({ email, password });
      navigate("/home");
    } catch {
      setError("Email ou senha inválidos");
    }
  };

  return (
    <Box className={styles.loginPage}>
      <Box className={styles.loginPageContent}>
        <Box className={styles.header}>
          <Logo onlyIcon={false} size="xs" />

          <Typography className={styles.headerSubText}>
            Gerencie seus produtos e pedidos
          </Typography>
        </Box>

        <Box className={styles.loginPageInputs}>
          <InputText
            label="E-mail"
            placeholder="Digite seu email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <InputText
            label="Senha"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? "text" : "password"}
            iconEnd={
              showPassword ? (
                <Eye onClick={() => setShowPassword(false)} />
              ) : (
                <EyeClosed onClick={() => setShowPassword(true)} />
              )
            }
          />

          <Typography className={styles.errorMessage}>{error}</Typography>
        </Box>

        <Box className={styles.loginPageActions}>
          <CustomButton
            type="submit"
            onClick={handleSubmit}
            disabled={email === "" && password === ""}
          >
            Login
          </CustomButton>

          <Link className={styles.registerMessage} to={"/register"}>
            Sem conta ainda, cadastre-se{" "}
            <span className={styles.registerSpanEmphasis}>aqui!</span>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
