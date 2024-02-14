import { TFormData } from '@/types';
import React, { useEffect, useState } from 'react'

const useStoredData = () => {
  const [storedData, setData] = useState({});
  useEffect(() => {
    const storedData = getStoredData();
    if (storedData) setData(storedData)
  }, [])
  
  const getStoredData = (): TFormData => {
    const storedData = typeof window !== 'undefined' && window.localStorage && localStorage.getItem('user-form-data');
    return storedData && JSON.parse(storedData);
  }
  return [storedData];
}

export default useStoredData
