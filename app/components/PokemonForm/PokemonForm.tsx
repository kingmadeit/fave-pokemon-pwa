import { IPokemon, PokemonFormProps, TFormData } from '@/types'
import React, { useCallback, useEffect, useState } from 'react'
import { useForm, Controller, SubmitHandler, SubmitErrorHandler } from 'react-hook-form'
import { TextField, Button } from '..';
import MenuItem from '@mui/material/MenuItem';
import styles from './pokemonForm.module.css'
import axios from 'axios';
import { HOST, POKEMON_LIST_ENDPOINT } from '@/constants';

const PokemonForm = ({ submitHandler}: PokemonFormProps) => {
  const {control, handleSubmit} = useForm<TFormData>();
  const [pokemonList, setPokemonList] = useState<{name: string; url: string;}[]>([])
  const getPokemonList = useCallback(async () => {
    try {
      const res = await axios.get(`${HOST}${POKEMON_LIST_ENDPOINT}`);
      setPokemonList(res.data)
    } catch (error) {
      console.log(error)
    }
  },[]);

  /***
   * fetch pokemon list onload
   */
  useEffect(() => {
    getPokemonList()
  }, [getPokemonList]);

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(submitHandler)} className={styles.form}>
        <Controller
          name="selected_pokemon"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              select
              required
              label="Pokemon"
              variant='outlined'
              {...field}
            >
              {pokemonList?.map((pokemon) => <MenuItem key={pokemon.name} value={pokemon.name}>{pokemon.name}</MenuItem> )}
            </TextField>
          )}
        />
        <Button variant="contained" disableElevation type="submit">Submit</Button>
      </form>
    </div>
  )
}

export default PokemonForm
