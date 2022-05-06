import { TextField } from '@mui/material';
import { FormEvent, useRef } from 'react';
import { useEndpoints } from '../../Hooks/useEndpoints';
import { Form, Submit } from './styles';
import * as yup from 'yup';
import { toast } from 'react-toastify';

export default function RegisterForm() {
  const registerSchema = yup.object().shape({
    name: yup.string().required('O nome é obrigatório'),
    email: yup
      .string()
      .email('Insira um email válido')
      .required('O email é obrigatório'),
    password: yup
      .string()
      .min(6, 'A senha deve conter no mínimo 6 caracteres')
      .required('A senha é obrigatória')
  });
  const { POSTREGISTER } = useEndpoints();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    try {
      await registerSchema.validate(
        {
          email: userRef.current ? userRef.current.value : '',
          password: passwordRef.current ? passwordRef.current.value : '',
          name: nameRef.current ? nameRef.current.value : ''
        },
        { abortEarly: false }
      );

      POSTREGISTER({
        email: userRef.current ? userRef.current.value : '',
        password: passwordRef.current ? passwordRef.current.value : '',
        name: nameRef.current ? nameRef.current.value : ''
      });
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        err.errors.map((error) => toast.error(error));
      }
    }
  }

  const userRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
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
