'use client';

import React, { createContext } from 'react';

type IAppContent = {
  title: string;
  description?: string;
  logo?: {
    src: string;
    width: number;
    height: number;
  };
  svgSize?: number;
};

export const initAppContent: IAppContent = {
  title: 'Capao Lab',
  description: '',
  logo: {
    src: './assets/logo.svg',
    width: 30,
    height: 30,
  },
  svgSize: 25,
};

type AppContentContextType = {
  content: IAppContent;
  setContent: React.Dispatch<React.SetStateAction<IAppContent>>;
};

const AppContentContext = createContext<AppContentContextType>({
  content: initAppContent,
  setContent: () => {},
});

export default AppContentContext;
