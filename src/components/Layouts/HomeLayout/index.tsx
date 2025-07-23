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
  IconArrowRight,
  IconArticle,
  IconBadgeAd,
  IconCoin,
  IconLayoutDashboard,
} from '@tabler/icons-react';

import useAppContent from '@/hooks/useAppContent';

import classes from './HomeLayout.module.css';

function HomeLayout({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();
  const [scroll, scrollTo] = useWindowScroll();
  const { content } = useAppContent();
  const theme = useMantineTheme();
  const pinned = useHeadroom({ fixedAt: 120 });
  const atTop = scroll.y < 720;

  console.log(scroll);

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
          transform: `translate3d(0, ${pinned ? 0 : '-110px'}, 0)`,
          transition: 'transform 400ms ease',
        }}
      >
        <Burger opened={opened} onClick={toggle} hiddenFrom='lg' size='md' />
        <Anchor href='#home' underline='never' className={classes.logo}>
          <Image
            src={content?.logo?.src || '/logo.png'}
            alt='Logo'
            w={content?.logo?.width || 30}
            h={content?.logo?.height || 30}
          />
          <Title order={2} textWrap='nowrap'>
            Vale do Capão
          </Title>
        </Anchor>
        <Flex
          id='menu-desktop'
          component='ul'
          align='center'
          justify='center'
          gap='md'
          display={{ base: 'none', lg: 'flex' }}
          className={classes.menu}
        >
          <Anchor href='#' target='_self' underline='never'>
            Home
          </Anchor>
          <Anchor href='#' target='_blank' underline='never'>
            Agenda
          </Anchor>
          <Anchor href='#' target='_self' underline='never'>
            Blog
          </Anchor>
          <Anchor href='#' target='_self' underline='never'>
            Serviços
          </Anchor>
          <Anchor href='#' target='_self' underline='never'>
            Contato
          </Anchor>
          <Button
            variant={atTop ? 'default' : 'filled'}
            leftSection={<IconCoin size={14} />}
          >
            Quero Patrocinar
          </Button>
          <Button variant='transparent' c={atTop ? 'white' : 'dark'}>
            Login
          </Button>
          <Button variant='default' radius='sm' c='dark'>
            Sign Up
          </Button>
        </Flex>
      </AppShell.Header>
      <AppShell.Navbar bg={theme.white}>
        <Flex w='100%' direction='column' justify='flex-start' gap='md' px='md'>
          <Flex h={70} ml={10} direction='row' align='center' gap='sm'>
            <Image
              src={content?.logo?.src || '/logo.png'}
              alt='Logo'
              w={content?.logo?.width || 30}
              h={content?.logo?.height || 30}
            />
            <Title order={3}>Vale do Capão</Title>
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
              href='/dashboard'
              label='Dashboard'
              variant='filled'
              leftSection={<IconLayoutDashboard size={content.svgSize} />}
            />
            <NavLink
              href='/blog'
              label='Blog'
              variant='filled'
              leftSection={<IconArticle size={content.svgSize} />}
            />
            <NavLink
              href='/anuncios'
              label='Anúncios'
              variant='filled'
              leftSection={<IconBadgeAd size={content.svgSize} />}
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
