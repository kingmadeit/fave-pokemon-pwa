export const HOST = process.env.API_HOST;
export const POKEMON_LIST_ENDPOINT = process.env.INTERNAL_POKEMON_LIST_ENDPOINT;

export const isValidEmail = (email:string) => {
  return email.toLowerCase().match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const capitalize = (str: string): string => str.split(' ').map(s => s.charAt(0).toUpperCase()+s.slice(1)).join(' ')