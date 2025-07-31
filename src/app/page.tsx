import { Anchor, Container, Title } from '@mantine/core';

import useAppContent from '@/hooks/useAppContent';

function Home() {
  const { content } = useAppContent();

  return (
    <Container size='md'>
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
    </Container>
  );
}

export default Home;
