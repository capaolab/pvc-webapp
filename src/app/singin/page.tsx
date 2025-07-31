'use client';

import { Flip } from '@gfazioli/mantine-flip';
import { Anchor, Container, Flex, Image, Text, Title } from '@mantine/core';
import { useState } from 'react';

import SingInForm from '@/components/Forms/SingInForm';
import SingUpForm from '@/components/Forms/SingUpForm';
import useAppContent from '@/hooks/useAppContent';

function SignIn() {
  const [flipped, setFlipped] = useState(false);
  const { content } = useAppContent();

  return (
    <Container h='100vh'>
      <Flex h='70%' direction='column' align='center' justify='center'>
        <Flex w={400} direction='row' align='center' justify='center' mb={5}>
          <Image
            alt={content.title}
            src={content.logo?.src}
            w={content.logo?.width}
            h={content.logo?.height}
          />
          <Title order={1} ml={20}>
            {content.title}
          </Title>
        </Flex>

        {!flipped ? (
          <Text c='dimmed' size='sm' ta='center' mt={5}>
            Ainda não tem cadastro?{' '}
            <Anchor
              size='sm'
              component='button'
              onClick={() => setFlipped(true)}
            >
              Crei sua conta
            </Anchor>
          </Text>
        ) : (
          <Text c='dimmed' size='sm' ta='center' mt={5}>
            Já tem cadastro?{' '}
            <Anchor
              size='sm'
              component='button'
              onClick={() => setFlipped(false)}
            >
              Login
            </Anchor>
          </Text>
        )}
        <Flip h={200} w={{ base: 350, md: 400 }} flipped={flipped}>
          <SingInForm />
          <SingUpForm />
        </Flip>
      </Flex>
    </Container>
  );
}

export default SignIn;
