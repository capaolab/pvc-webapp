import { Button, Flex, Modal, NavLink, ThemeIcon } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconBrandLinkedinFilled,
  IconBrandWhatsapp,
  IconMailFilled,
  IconPhone,
  IconXboxX,
} from '@tabler/icons-react';
import Link from 'next/link';

type IProps = {
  svgSize?: number;
};

function ContactModal({ svgSize }: IProps) {
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
        <Flex
          direction={{ base: 'column', md: 'row' }}
          gap={{ base: 20, md: 0 }}
          justify='space-between'
          align='center'
        >
          <NavLink
            href='/#'
            label='Whatsapp'
            variant='filled'
            component={Link}
            leftSection={
              <ThemeIcon color='#25D366' variant='filled' radius='md' size={30}>
                <IconBrandWhatsapp size={svgSize} color='white' />
              </ThemeIcon>
            }
          />

          <NavLink
            href='/#'
            label='Email'
            variant='filled'
            component={Link}
            leftSection={
              <ThemeIcon color='blue' variant='filled' radius='md'>
                <IconMailFilled size={svgSize} />
              </ThemeIcon>
            }
          />

          <NavLink
            href='/#'
            label='Linkedin'
            variant='filled'
            component={Link}
            leftSection={<IconBrandLinkedinFilled color='#0077B5' size={31} />}
          />
        </Flex>
      </Modal>

      {/* Desktop Button */}
      <Button
        display={{ base: 'none', lg: 'block' }}
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

      {/* Mobile Button */}
      <Button
        display={{ base: 'block', lg: 'none' }}
        variant='transparent'
        onClick={open}
        leftSection={<IconPhone size={svgSize || 14} />}
        w='max-content'
        p={0}
        mx='xs'
        color='dark'
        size='inherit'
        fw='inherit'
      >
        Contato
      </Button>
    </>
  );
}
export default ContactModal;
