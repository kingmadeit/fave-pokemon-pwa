import { IPokemonListResponse } from "@/types";
import axios from "axios";

const POKEMON_LIST = process.env.EXTERNAL_POKEMON_LIST_ENDPOINT;

const GET = async (req: Request) => {
  try {
    const res = await axios.get<IPokemonListResponse>(`${POKEMON_LIST}`);
    return Response.json(res.data.results);
  } catch(e) {
    console.log(e)
  }
}


export {GET}