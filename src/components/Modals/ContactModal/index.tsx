import { Button, Flex, Modal, NavLink } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconXboxX } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';

function ContactModal() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title='Contato'
        closeButtonProps={{
          icon: <IconXboxX size={20} stroke={1.5} />,
        }}
      >
        <Flex justify='space-between' align='center'>
          <NavLink
            href='/#'
            label='Whatsapp'
            variant='filled'
            component={Link}
            leftSection={
              <Image
                src='/icons/whatsapp.svg'
                alt='Contato de Whatsapp'
                width={25}
                height={25}
              />
            }
          />
          <NavLink
            href='/#'
            label='Email'
            variant='filled'
            component={Link}
            leftSection={
              <Image
                src='/icons/gmail.svg'
                alt='Contato de Email'
                width={25}
                height={25}
              />
            }
          />
          <NavLink
            href='/#'
            label='Linkedin'
            variant='filled'
            component={Link}
            leftSection={
              <Image
                src='/icons/linkedin.svg'
                alt='Contato de Linkedin'
                width={25}
                height={25}
              />
            }
          />
        </Flex>
      </Modal>

      <Button
        variant='transparent'
        fz='inherit'
        fw='inherit'
        size='inherit'
        p={0}
        color='white'
        onClick={open}
      >
        Contato
      </Button>
    </>
  );
}
export default ContactModal;
