'use client';
import { useState } from 'react';

import AppContentContext, { initAppContent } from '@/context/AppContentContext';

const AppContentProvider = ({ children }: { children: React.ReactNode }) => {
  const [content, setContent] = useState(initAppContent);

  return (
    <AppContentContext.Provider value={{ content, setContent }}>
      {children}
    </AppContentContext.Provider>
  );
};

export default AppContentProvider;
