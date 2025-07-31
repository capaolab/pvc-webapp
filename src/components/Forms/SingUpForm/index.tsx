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

function SingUpForm() {
  const theme = useMantineTheme();

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
        if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(value))
          return 'Senha precisa de letras e números';
        return null;
      },
    },
  });

  const handleSubmit = () => {
    console.log(form.values);
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
            Submit
          </Button>
        </Group>
        <Divider label='ou' labelPosition='center' my='lg' />
        <Group justify='flex-start' mt='xl'></Group>
      </Paper>
    </form>
  );
}

export default SingUpForm;
