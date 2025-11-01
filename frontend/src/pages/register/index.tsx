import { Box, Typography } from "@mui/material";
import { Link } from "react-router";
import { useState } from "react";
import { type UserRegisterPayload } from "../../interfaces/users";
import Logo from "../../components/Logo";

import styles from "./register.module.css";
import InputText from "../../components/InputText";
import { Eye, EyeClosed } from "lucide-react";
import CustomButton from "../../components/CustomButtom";
import { UserService } from "../../services/user";

const RegisterPage = () => {
  const [userForm, setUserForm] = useState<Partial<UserRegisterPayload>>({
    email: undefined,
    username: undefined,
    password: undefined,
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [error, setError] = useState<string>("");
  const [isRegistrationSuccessful, setIsRegistrationSuccessful] =
    useState<boolean>(false);

  const onRegisterAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    await UserService.regiser(userForm as UserRegisterPayload)
      .then(() => {
        setIsRegistrationSuccessful(true);
      })
      .catch((e) => {
        setError(e.response.data.errorMessage);
      });
  };

  const formDataIsValid = (): boolean => {
    return !userForm.email || !userForm.username || !userForm.password;
  };

  return (
    <Box className={styles.registerPage}>
      <Box className={styles.registerPageContent}>
        <Box className={styles.header}>
          <Logo onlyIcon={false} size="xs" />

          <Typography className={styles.headerSubText}>
            Gerencie seus produtos e pedidos
          </Typography>
        </Box>
        {isRegistrationSuccessful ? (
          <Box className={styles.registerPageSuccess}>
            <Typography className={styles.headerSubText}>
              Registro efetuado com sucesso!
            </Typography>

            <Link className={styles.registerGoToLoginPage} to={"/login"}>
              Ir para a tela de login
            </Link>
          </Box>
        ) : (
          <>
            <Box className={styles.registerPageInputs}>
              <InputText
                label="E-mail"
                placeholder="Digite seu email"
                onChange={(e) =>
                  setUserForm((prev) => ({ ...prev, email: e.target.value }))
                }
                type="email"
              />

              <InputText
                label="Nome de usuário"
                placeholder="Digite seu nome"
                onChange={(e) =>
                  setUserForm((prev) => ({ ...prev, username: e.target.value }))
                }
                type="text"
              />

              <InputText
                label="Senha"
                placeholder="Digite sua senha"
                type={showPassword ? "text" : "password"}
                onChange={(e) =>
                  setUserForm((prev) => ({ ...prev, password: e.target.value }))
                }
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

            <Box className={styles.registerPageActions}>
              <CustomButton
                type="submit"
                onClick={onRegisterAccount}
                disabled={formDataIsValid()}
              >
                Concluir cadastro
              </CustomButton>

              <Link className={styles.registerMessage} to={"/login"}>
                Já possui conta? Acesse sua conta{" "}
                <span className={styles.registerSpanEmphasis}>aqui!</span>
              </Link>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default RegisterPage;
