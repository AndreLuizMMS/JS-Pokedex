// consulta a API  de Pokemons
const getPokemon = async pokemon => {
  const APIresponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  )
  const data = await APIresponse.json()
  return data
}

const pokeName = document.querySelector('.poke-name')
const pokeNumber = document.querySelector('.poke-number')
const pokemonImg = document.querySelector('.pokemon-img')

const form = document.querySelector('.form')
const input = document.querySelector('.search-input')



const renderPokemon = async pokemon => {
  const data = await getPokemon(pokemon)

  

  // acessa e renderiza o nome
  const name = data.name
  pokeName.innerHTML = name

  // acessa e renderiza o id
  const id = data.id
  pokeNumber.innerHTML = `${id} - `

  //acessa e renderiza a Imagem (GIF)
  const img = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
  pokemonImg.setAttribute('src', img)
 
}

form.addEventListener('submit', (e) => {
  
  e.preventDefault()

  renderPokemon(input.value)
  input.value = '';
})