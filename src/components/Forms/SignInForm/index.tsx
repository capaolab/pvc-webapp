'use client';

import {
  Button,
  Divider,
  Group,
  Paper,
  PasswordInput,
  TextInput,
  useMantineTheme,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

import { defaultNotification } from '@/lib/message.config';

function SignInForm() {
  const theme = useMantineTheme();
  const router = useRouter();

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: value => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: value => {
        if (value.length < 8) return 'Senha muito curta';
        // if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(value))
        //   return 'Senha precisa de letras e números';
        return null;
      },
    },
  });

  const handleSubmit = async () => {
    const { email, password } = form.values;
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      console.log(result);
      if (result?.error) {
        defaultNotification({
          title: 'Login falhou',
          message: result.error,
        });
      } else {
        router.push('/dashboard');
      }
    } catch (err) {
      console.error('Erro ao fazer login:', err);
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Paper mt='xl' bg={theme.colors.gray[1]} shadow='sm' p='xl'>
        <TextInput
          label='E-mail'
          description='Ex.: joao@mail.com'
          key={form.key('email')}
          {...form.getInputProps('email')}
        />
        <PasswordInput
          mt='md'
          label='Senha'
          description='Mínimo 8 caracteres, com letras e números'
          key={form.key('password')}
          {...form.getInputProps('password')}
        />
        <Group justify='flex-end' mt='xl'>
          <Button w='100%' type='submit'>
            Entrar
          </Button>
        </Group>
        <Divider label='ou' labelPosition='center' my='lg' />
      </Paper>
    </form>
  );
}

export default SignInForm;
