'use client';

import {
  AppShell,
  Avatar,
  Burger,
  Flex,
  Image,
  Indicator,
  NavLink,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconArticle,
  IconBadgeAd,
  IconLayoutDashboard,
} from '@tabler/icons-react';
import React from 'react';

import SearchButton from '@/components/SearchButton';
import useAppContent from '@/hooks/useAppContent';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [opened, { toggle }] = useDisclosure();
  const { content } = useAppContent();
  const theme = useMantineTheme();

  return (
    <AppShell
      layout='alt'
      header={{ height: 60 }}
      footer={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'lg', collapsed: { mobile: !opened } }}
      withBorder={false}
      padding='md'
      c={theme.colors.gray[8]}
      bg={theme.white}
    >
      <AppShell.Header bg={theme.colors.gray[1]}>
        <Flex
          h='100%'
          px='md'
          direction='row'
          justify='space-between'
          align='center'
        >
          <Burger opened={opened} onClick={toggle} hiddenFrom='lg' size='sm' />
          {/* TODO Renderizar o Título da página de acordo com a feature de navegação*/}
          <Title order={3} w='100%'>
            {content?.title || 'Dashboard'}
          </Title>
          <Flex justify='flex-end' align='center' gap={10} w='100%'>
            <SearchButton />
            <Indicator inline position='top-end' color='red'>
              {/* TODO Renderizar Logo do usuário */}
              <Avatar src='' radius='sm' size='md' />
            </Indicator>
          </Flex>
        </Flex>
      </AppShell.Header>
      <AppShell.Navbar bg={theme.white}>
        <Flex w='100%' direction='column' justify='flex-start' gap='md' px='md'>
          <Burger opened={opened} onClick={toggle} hiddenFrom='lg' size='sm' />
          <Flex
            component='header'
            w={'100%'}
            h={60}
            p='sm'
            direction='row'
            justify='space-between'
            align='center'
          >
            <Image
              src={content?.logo?.src || '/logo.png'}
              alt='Logo'
              w={content?.logo?.width || 30}
              h={content?.logo?.height || 30}
            />
            <Title order={3} w='80%'>
              {content?.title || 'Dashboard'}
            </Title>
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

      <AppShell.Main bg={theme.colors.gray[1]}>{children}</AppShell.Main>

      <AppShell.Footer p='md' bg={theme.colors.gray[1]}>
        Footer
      </AppShell.Footer>
    </AppShell>
  );
}
