import { Button, Flex, Modal, NumberInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { IconCoin, IconXboxX } from '@tabler/icons-react';

function SponsorModal() {
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      name: '',
      lastname: '',
      age: 0,
      phone: '',
    },

    validate: {
      name: value => {
        if (value.length < 3) return 'Nome muito curto';
        return null;
      },
      lastname: value => {
        if (value.length < 3) return 'Sobrenome muito curto';
        if (value) return 'Sobren';
        return null;
      },
      email: value => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      age: value => {
        if (value < 18) return 'Idade muito baixa';
        return null;
      },
      phone: value =>
        /^\(?[1-9]{2}\)? ?(?:[2-8]|9[0-9])[0-9]{3}\-?[0-9]{4}$/.test(value)
          ? null
          : 'Telefone inválido',
    },
  });

  const handleSubmit = () => {
    console.log(form.values);
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title='Patrocinar'
        closeButtonProps={{
          icon: <IconXboxX size={20} stroke={1.5} />,
        }}
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Flex direction='column' gap='md' mt='md'>
            <TextInput
              label='Nome'
              placeholder='Name'
              key={form.key('name')}
              {...form.getInputProps('name')}
            />
            <TextInput
              label='Sobrenome'
              placeholder='Sobrenome'
              key={form.key('lastname')}
              {...form.getInputProps('lastname')}
            />
            <TextInput
              label='E-mail'
              description='Ex.: joao@mail.com'
              key={form.key('email')}
              {...form.getInputProps('email')}
            />
            <TextInput
              label='Telefone'
              description='Ex.: (99) 99999-9999'
              key={form.key('phone')}
              {...form.getInputProps('phone')}
            />
            <NumberInput
              label='Idade'
              placeholder='Age'
              min={0}
              max={99}
              key={form.key('age')}
              {...form.getInputProps('age')}
            />

            <Button w='100%' mt='md' type='submit'>
              Enviar
            </Button>
          </Flex>
        </form>
      </Modal>

      <Button
        variant='default'
        onClick={open}
        leftSection={<IconCoin size={14} />}
      >
        Quero Patrocinar
      </Button>
    </>
  );
}
export default SponsorModal;
