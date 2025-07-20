import { Anchor, Container, Title } from '@mantine/core';

function Home() {
  return (
    <Container size='md'>
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
    </Container>
  );
}

export default Home;
