export function getPokemonId(url: string): number {
    // Extract the Pokémon ID from the URL
    // Example URL: "https://pokeapi.co/api/v2/pokemon/1/"
    // The ID is the second last segment of the URL
    if (!url) return 0; // Handle empty URL case
    //return parseInt(url.split('/').slice(-2, -1)[0], 10
    return parseInt(url.split('/').at(-2)!, 10);

}   


export function getPokemonArtWork(id:number|string):string{
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
}

export function formatWeight(weight?:number):string{
    if (!weight) {
        return "";
    }
    return (weight/10).toString().replace('.',',')+' kg'
}

export function formatSize(size?:number):string{
    if (!size) {
        return "";
    }
    return (size/10).toString().replace('.',',')+' m'
}