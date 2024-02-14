'use client'
import React, { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { TextField, Button, Typography } from '..';
import { IUser, UserFormProps } from '@/types';
import styles from './userForm.module.css'
import useStoredData from '@/app/hooks/useStoreData';
import { isValidEmail } from '@/constants';

const UserForm: React.FC<UserFormProps> = ({submitHandler}: UserFormProps) => {
  const {control, setError, reset, formState: {errors}, handleSubmit} = useForm<IUser>();
  const [storedData] = useStoredData();
  
  /***
   * onload, reset form with stored data if any
   */
  useEffect(() => {
    if (storedData) reset(storedData);
  }, [reset, storedData])

  /***
   * validate the email to see if is it valid before submission
   */
  const validateEmail = (data: IUser) => {
    if (!isValidEmail(data.email)) {
      return setError('email', { 
        type: 'focus',
        message: 'Invalid Email',
      });
    }

    return submitHandler(data);
  }
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(validateEmail)} className={styles.form}>
        <Controller
          name="name" 
          control={control}
          defaultValue='' 
          render={({ field }) => <TextField variant='standard' required label="Name" {...field} />}
        />
        <Controller 
          name="email" 
          control={control} 
          defaultValue=''
          render={({ field }) => (
            <>
            <TextField
              variant='standard' 
              required 
              label="Email"
              {...field}
            />
            {errors.email && <Typography variant="caption" color="error">{errors.email.message}</Typography>}
            </>
          )}
        /> 
        <Button variant="contained" disableElevation type='submit'>Proceed</Button>
      </form>
      
    </div>
  )
}

export default UserForm
