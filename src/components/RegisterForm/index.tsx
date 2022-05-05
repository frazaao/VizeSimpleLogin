import { TextField } from '@mui/material';
import { FormEvent, useRef } from 'react';
import { Form, Submit } from './styles';

export default function RegisterForm() {
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
  }

  const userRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  return (
    <Form
      onSubmit={(e) => {
        handleSubmit(e);
        console.log({
          user: userRef.current?.value,
          password: passwordRef.current?.value,
          name: nameRef.current?.value
        });
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
      <TextField
        inputProps={{
          ref: nameRef
        }}
        id="nameInput"
        label="Nome"
        variant="filled"
      />
      <Submit>Registrar</Submit>
    </Form>
  );
}
