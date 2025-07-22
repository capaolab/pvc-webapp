'use client';

import {
  Anchor,
  Box,
  Button,
  Flex,
  Group,
  Menu,
  Portal,
  Text,
} from '@mantine/core';
import { useHeadroom } from '@mantine/hooks';
import { FaBeer } from 'react-icons/fa';

function SideBar() {
  const pinned = useHeadroom({ fixedAt: 120 });

  return (
    <Portal>
      <Flex
        component='nav'
        justify={'center'}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          padding: 'var(--mantine-spacing-xs)',
          height: 60,
          zIndex: 1000000,
          transform: `translate3d(0, ${pinned ? 0 : '-110px'}, 0)`,
          transition: 'transform 400ms ease',
          backgroundColor: 'var(--mantine-color-body)',
        }}
      >
        <Flex component='ul' align='center' justify='center' gap='md'>
          <Anchor
            href='https://mantine.dev/'
            target='_blank'
            underline='always'
          >
            Underline always
          </Anchor>
          <Anchor href='https://mantine.dev/' target='_blank' underline='hover'>
            Underline hover
          </Anchor>
          <Anchor href='https://mantine.dev/' target='_blank' underline='never'>
            Underline never
          </Anchor>
          <Anchor
            href='https://mantine.dev/'
            target='_blank'
            underline='not-hover'
          >
            Underline not-hover
          </Anchor>
        </Flex>
      </Flex>
    </Portal>
  );
}

export default SideBar;
