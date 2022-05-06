import { FormEvent, useRef } from 'react';
import { Link } from 'react-router-dom';
import { TextField } from '@mui/material';
import * as yup from 'yup';
import { toast } from 'react-toastify';

import { useEndpoints } from '../../Hooks/useEndpoints';

import { Form, Submit } from './styles';

export default function LoginForm() {
  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .email('Insira um email válido')
      .required('O email é obrigatório'),
    password: yup
      .string()
      .min(6, 'A senha deve conter no mínimo 6 caracteres')
      .required('A senha é obrigatória')
  });

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    try {
      await loginSchema.validate(
        {
          email: userRef.current ? userRef.current.value : '',
          password: passwordRef.current ? passwordRef.current.value : ''
        },
        { abortEarly: false }
      );

      POSTLOGIN({
        email: userRef.current ? userRef.current.value : '',
        password: passwordRef.current ? passwordRef.current.value : ''
      });
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        err.errors.map((error) => toast.error(error));
      } else {
        console.log('Erro: ', err);
      }
    }
  }

  const { POSTLOGIN } = useEndpoints();

  const userRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  return (
    <Form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <TextField
        inputProps={{
          ref: userRef
        }}
        id="userInput"
        label="Usuário"
        variant="filled"
      />
      <TextField
        inputProps={{
          ref: passwordRef
        }}
        type="password"
        id="passwordInput"
        label="Senha"
        variant="filled"
      />
      <Submit>Login</Submit>

      <Link to="/register">
        <Submit>Registrar</Submit>
      </Link>
    </Form>
  );
}
