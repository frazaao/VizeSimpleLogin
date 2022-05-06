import { TextField } from '@mui/material';
import { FormEvent, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useEndpoints } from '../../Hooks/useEndpoints';
import { Form, Submit } from './styles';

export default function RegisterForm() {
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    POSTLOGIN({
      email: userRef.current ? userRef.current.value : '',
      password: passwordRef.current ? passwordRef.current.value : ''
    });
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
