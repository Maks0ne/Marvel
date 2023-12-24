


class MarvelService {
  getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status ${res.status}`)
    }
    return await res.json()
  }
  getAllCharacters = () => {
    return this.getResource('https://gateway.marvel.com:443/v1/public/characters?limit=9&offset=210&apikey=e0204087a0331476165ba19368d086b3')
  }
}

export default MarvelService;

