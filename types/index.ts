import { SubmitHandler } from "react-hook-form";

export interface IUser {
  name: string;
  email: string;
}

export interface UserFormProps {
  submitHandler: SubmitHandler<IUser>;
}

export interface PokemonFormProps {
  submitHandler: SubmitHandler<Partial<TFormData>>;
}

export interface PokemonCardProps {
  pokemonName: string;
  userName: string;
}

export type TFormData = IUser & {selected_pokemon: string;}
export interface IPokemonResult {name: string; url: string}

export interface IPokemonListResponse {
  count: number;
  next?: string | null;
  previous?: string | null;
  results: IPokemonResult[]
}