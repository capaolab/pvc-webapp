import { useContext } from 'react';

import AppContentContext from '@/context/AppContentContext';
export default function useAppContent() {
  return useContext(AppContentContext);
}
