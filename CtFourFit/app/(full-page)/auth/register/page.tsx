'use client';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { LayoutContext } from '../../../../layout/context/layoutcontext';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7069/api', // Base URL da API
  headers: {
    'Content-Type': 'application/json', // Tipo de conteúdo
  },
});

const RegisterPage = () => {
  const [primeironome, setPrimeiroNome] = useState('');
  const [sobrenome, setSobreNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setpasswordConfirm] = useState('');
  const [celular, setCelular] = useState('');
  const { layoutConfig } = useContext(LayoutContext);
  const router = useRouter();
  
  
  const handleRegister = async () => {
    if (password !== passwordConfirm) {
      alert('As senhas não correspondem.');
      return;
    }
    try {
      // Enviar a solicitação de registro para o endpoint correto
      const response = await api.post('/auth/register', {
        PrimeiroNome: primeironome,
        SobreNome: sobrenome,
        Email: email,
        Password: password,
        PasswordConfirmn: passwordConfirm,
        Celular: celular
      });
      // Redirecione para a página de login após o registro
      alert('Registro realizado com sucesso!');
      router.push('/pages/student');
    } catch (error) {
      console.error('Erro ao fazer registro', error);
      alert('Falha no registro. Verifique os dados informados.');
    }
  };

  const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', {
    'p-input-filled': layoutConfig.inputStyle === 'filled'
  });

  return (
    <div className={containerClassName}>
      <div className="flex flex-column align-items-center justify-content-center">
        <img src={`/layout/images/logo-${layoutConfig.colorScheme === 'light' ? 'dark' : 'white'}.svg`} alt="Sakai logo" className="mb-5 w-6rem flex-shrink-0" />
        <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
          <div>
            <label htmlFor="primeiroNome" className="block text-900 text-xl font-medium mb-2">
              Primeiro Nome
            </label>
            <InputText
              id="primeiroNome"
              type="text"
              placeholder="Digite seu primeiro nome"
              className="w-full md:w-30rem mb-5"
              style={{ padding: '1rem' }}
              value={primeironome}
              onChange={(e) => setPrimeiroNome(e.target.value)}
            />

            <label htmlFor="segundoNome" className="block text-900 text-xl font-medium mb-2">
              Segundo Nome
            </label>
            <InputText
              id="segundoNome"
              type="text"
              placeholder="Digite seu segundo nome"
              className="w-full md:w-30rem mb-5"
              style={{ padding: '1rem' }}
              value={sobrenome}
              onChange={(e) => setSobreNome(e.target.value)}
            />

            <label htmlFor="email" className="block text-900 text-xl font-medium mb-2">
              Email
            </label>
            <InputText
              id="email"
              type="email"
              placeholder="Digite seu email"
              className="w-full md:w-30rem mb-5"
              style={{ padding: '1rem' }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="senha" className="block text-900 font-medium text-xl mb-2">
              Senha
            </label>
            <Password
              inputId="senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              toggleMask
              className="w-full mb-5"
              inputClassName="w-full p-3 md:w-30rem"
            />

            <label htmlFor="confirmeSenha" className="block text-900 font-medium text-xl mb-2">
              Confirme a Senha
            </label>
            <Password
              inputId="confirmeSenha"
              value={passwordConfirm}
              onChange={(e) => setpasswordConfirm(e.target.value)}
              placeholder="Confirme sua senha"
              toggleMask
              className="w-full mb-5"
              inputClassName="w-full p-3 md:w-30rem"
            />

            <label htmlFor="celular" className="block text-900 text-xl font-medium mb-2">
              Celular
            </label>
            <InputText
              id="celular"
              type="text"
              placeholder="Digite seu número de celular"
              className="w-full md:w-30rem mb-5"
              style={{ padding: '1rem' }}
              value={celular}
              onChange={(e) => setCelular(e.target.value)}
            />

            <Button label="Registrar" className="w-full p-3 text-xl" onClick={handleRegister}></Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
