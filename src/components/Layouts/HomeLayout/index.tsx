'use client';

import {
  Anchor,
  AppShell,
  Burger,
  Button,
  Flex,
  Image,
  NavLink,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure, useHeadroom, useWindowScroll } from '@mantine/hooks';
import {
  IconArticle,
  IconCalendarCheck,
  IconIcons,
  IconLogin,
} from '@tabler/icons-react';
import Link from 'next/link';
import { useEffect } from 'react';

import ContactModal from '@/components/Modals/ContactModal';
import SponsorModal from '@/components/Modals/SponsorModal';
import useAppContent from '@/hooks/useAppContent';

import classes from './HomeLayout.module.css';

function HomeLayout({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();
  const [scroll] = useWindowScroll();
  const { content } = useAppContent();
  const theme = useMantineTheme();
  const pinned = useHeadroom({ fixedAt: 120 });
  const atTop = scroll.y < 600;

  useEffect(() => {
    document.body.style.overflow = opened ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [opened]);

  return (
    <AppShell
      layout='alt'
      header={{ height: 60 }}
      footer={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'lg',
        collapsed: { mobile: !opened, desktop: true },
      }}
      withBorder={false}
      padding='md'
      c={theme.colors.gray[8]}
      bg={theme.white}
    >
      <AppShell.Header
        px='xl'
        className={atTop ? classes.headerAtTop : classes.header}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          padding: 'var(--mantine-spacing-xs)',
          height: 60,
          zIndex: 10,
          // display: `${opened ? 'none' : 'flex'}`,
          transform: `translate3d(0, ${pinned ? 0 : '-110px'}, 0)`,
          transition: 'transform 400ms ease',
        }}
        color='white'
      >
        <Anchor
          href='#home'
          underline='never'
          component={Link}
          className={classes.logo}
        >
          <Image
            src={content?.logo?.src || '/logo.png'}
            alt='Logo'
            w={content?.logo?.width || 30}
            h={content?.logo?.height || 30}
          />
          <Title order={2} fw={700} textWrap='nowrap'>
            Vale do Capão
          </Title>
        </Anchor>
        <Flex
          component='ul'
          align='center'
          justify='center'
          gap='md'
          mr='auto'
          display={{ base: 'none', lg: 'flex' }}
          className={classes.menu}
        >
          <Link href='#' className='link'>
            Agenda
          </Link>
          <Link href='#' className='link'>
            Blog
          </Link>
          <Link href='#' className='link'>
            Serviços
          </Link>
          <ContactModal />
        </Flex>
        <Flex gap='md' align='center' display={{ base: 'none', lg: 'flex' }}>
          <SponsorModal />
          <Anchor href='/signin' underline='never' component={Link} c='white'>
            Login
          </Anchor>
          <Button variant='default' radius='sm' c='dark'>
            Sign Up
          </Button>
        </Flex>
        <Burger
          color='white'
          opened={opened}
          onClick={toggle}
          hiddenFrom='lg'
          size='md'
        />
      </AppShell.Header>
      <AppShell.Navbar bg={theme.white}>
        <Flex w='100%' direction='column' justify='flex-start' gap='md' px='md'>
          <Flex h={70} ml={10} direction='row' align='center' gap='sm'>
            <Anchor
              href='#home'
              underline='never'
              component={Link}
              className={classes.logo}
            >
              <Image
                src={content?.logo?.src || '/logo.png'}
                alt='Logo'
                w={content?.logo?.width || 30}
                h={content?.logo?.height || 30}
              />
              <Title order={3}>Vale do Capão</Title>
            </Anchor>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom='lg'
              ml='auto'
              size='md'
            />
          </Flex>
          <Flex py={20} direction='column' justify='flex-start' gap={10}>
            <NavLink
              href='/#'
              label='Agenda'
              variant='filled'
              component={Link}
              leftSection={<IconCalendarCheck size={content.svgSize} />}
            />
            <NavLink
              href='/#'
              label='Blog'
              variant='filled'
              component={Link}
              leftSection={<IconArticle size={content.svgSize} />}
            />
            <NavLink
              href='/#'
              label='Serviços'
              variant='filled'
              component={Link}
              leftSection={<IconIcons size={content.svgSize} />}
            />
            <ContactModal svgSize={content.svgSize} />
            <SponsorModal svgSize={content.svgSize} />
            <NavLink
              href='/signin'
              label='Login'
              variant='filled'
              component={Link}
              leftSection={<IconLogin size={content.svgSize} />}
            />
          </Flex>
        </Flex>
      </AppShell.Navbar>

      <AppShell.Main id='home' bg={theme.colors.gray[1]} m={0} p={0}>
        {children}
      </AppShell.Main>

      <AppShell.Footer
        className={classes.footer}
        p='md'
        bg={theme.colors.gray[1]}
      >
        Footer
      </AppShell.Footer>
    </AppShell>
  );
}

export default HomeLayout;
