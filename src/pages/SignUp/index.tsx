import React from "react";
import { useNavigate } from 'react-router-dom';

import axios from "../../api/axios";
import AuthForm from "../../components/AuthForm";

const SignUp = () => {
  const navigate = useNavigate();

  const handleRegister = async (user: string, password: string) => {
    await axios.post('/security/register', {
      user,
      password,
    });

    navigate("/");
  };

  return (
    <AuthForm
      onSubmitForm={handleRegister}
      onSubmitButtonText='Cadastrar-se'
      onRouteText='Já tem uma conta? Faça o Login'
      onRouteLink='/'
    />
  );
}

export default SignUp;
