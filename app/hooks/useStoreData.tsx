import { TFormData } from '@/types';
import React, { useEffect, useState } from 'react'

const useStoredData = (): [TFormData | null] => {
  const [storedData, setData] = useState<TFormData | null>(null);
  useEffect(() => {
    const storedData = getStoredData();
    if (storedData) setData(storedData)
  }, [])
  
  const getStoredData = (): TFormData | null => {
    const data = typeof window !== 'undefined' && window.localStorage && localStorage.getItem('user-form-data');
    if (typeof data === 'string' && JSON.parse(data)) return JSON.parse(data) as TFormData;
    return null;
  }
  return [storedData];
}

export default useStoredData
