import axios from 'axios';
import Image from 'next/image'
import React, { useCallback, useEffect, useState } from 'react'
import styles from './pokemonCard.module.css'
import { CircularProgress, Typography } from '..';
import { capitalize } from '@/constants';

const PokemonCard = ({pokemonName, userName}: {pokemonName: string, userName: string}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [pokemon, setPokemon] = useState<{name: string; image: string;}>({
    name: '', image: ''
  })
  const endpoint = `${process.env.API_HOST}${process.env.INTERNAL_POKEMON_DETAIL_ENDPOINT}?pokemon_name=${pokemonName}`

  /***
   * cache selected pokemon results between renders unless pokemonName changes
   */
  const getSelectedPokemon = useCallback(async () => {
    try {
      const res = await axios.get(endpoint);
      setPokemon(res.data)
    } catch (error) {
      console.log(error)
    }
  },[endpoint]);

  /***
   * fetch selected pokemon detail onload
   */
  useEffect(() => {
    if (!!pokemonName) getSelectedPokemon()
    setTimeout(() => setIsLoading(false), 500);
  }, [getSelectedPokemon, pokemonName]);

  
  return (
    <>
      {isLoading && <CircularProgress />}
      {!isLoading && 
        <div className={styles.container}>
            <>
              <Typography variant='h6' color='gray'>Welcome, {capitalize(userName)}!</Typography>
              <Typography variant='body2' color='primary'>meet your favorite pokemon</Typography>
              {!!pokemon.image && <Image src={pokemon.image} alt={pokemon.name} width={250} height={250} />}
              <Typography variant='h2'>{capitalize(pokemonName)}</Typography>
            </>
        </div>
      }
    </>
  )
}

export default PokemonCard
