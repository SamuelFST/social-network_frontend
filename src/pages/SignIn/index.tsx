import React from 'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';

import logo from '../../assets/logo.svg';
import AuthForm from '../../components/AuthForm';
import axios from '../../api/axios';

interface TokenUser {
  user: string;
  profile: string;
}

const SignIn = () => {
  const navigate = useNavigate();

  const handleLogin = async (user: string, password: string) => {
    try {
      const response = await axios.post('/security/login', {
        user,
        password,
      });

      const { accessToken } = response.data;
      localStorage.setItem('accessToken', accessToken);

      const decoded = jwtDecode(accessToken) as TokenUser;
      localStorage.setItem('user', decoded.user);
      localStorage.setItem('profile', decoded.profile);

      toast.info(`Seja bem vindo, ${decoded.user}!`, {
        icon: () =>  <img src={logo} alt="parrot logo"/>,
      });

      navigate("/home");
    } catch (err) {
      toast.error(`Ocorreu um erro ao fazer login`);
    }

  };


  return (
    <AuthForm
      onSubmitForm={handleLogin}
      onSubmitButtonText='Log-in'
      onRouteText='Não tem uma conta? Faça o cadastro'
      onRouteLink='/register'
    />
  );
}

export default SignIn;
