import React from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import axios from "../../api/axios";
import AuthForm from "../../components/AuthForm";

const SignUp = () => {
  const navigate = useNavigate();

  const handleRegister = async (user: string, password: string) => {
    try {
      await axios.post('/security/register', {
        user,
        password,
      });

      toast.success('Cadastro realizado com sucesso!');
      navigate("/");
    } catch (err) {
      toast.error(`Ocorreu um erro ao tentar se cadastrar, tente novamente`);
    }

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
