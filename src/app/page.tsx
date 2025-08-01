'use client';

import { Anchor, Box, Title } from '@mantine/core';

import Banner from '@/components/Banner';
import HomeLayout from '@/components/Layouts/HomeLayout';
import useAppContent from '@/hooks/useAppContent';

function Home() {
  const { content } = useAppContent();

  return (
    <HomeLayout>
      <Banner />
      <Box px='xl' mt={100} h='4000' component='header'>
        <Title order={1}>{content.title}</Title>
        <Title order={2}>
          Desenvolvido por
          <Anchor
            href='https://capaolab.com.br'
            target='_blank'
            fz='axl'
            fw={700}
            ml={20}
          >
            Capão Lab
          </Anchor>
        </Title>
      </Box>
    </HomeLayout>
  );
}

export default Home;
