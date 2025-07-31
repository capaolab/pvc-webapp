'use client';

import { Anchor, Box, Title } from '@mantine/core';

import Banner from '@/components/Banner';
import HomeLayout from '@/components/Layouts/HomeLayout';

function Home() {
  return (
    <HomeLayout>
      <Banner />
      <Box px='xl' mt={100} h='4000' component='header'>
        <Title order={1}>Portal Vale do Capão</Title>
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
