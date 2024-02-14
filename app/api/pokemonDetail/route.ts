import axios from "axios";

const POKEMON_DETAIL = process.env.POKEMON_DETAIL_ENDPOINT;

const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url)
  const name = searchParams.get('pokemon_name')
  console.log(`${POKEMON_DETAIL}${name}`)
  try {
    const res = await axios.get(`${POKEMON_DETAIL}${name}`);
    const { sprites } = res.data;
    return Response.json({ 
      name: res.data.name, 
      image: sprites.default || sprites.front_default
    });
  } catch(e) {
    console.log(e)
  }
}
export {GET}