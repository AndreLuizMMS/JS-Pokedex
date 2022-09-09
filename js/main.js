const pokeName = document.querySelector('.poke-name')
const pokeNumber = document.querySelector('.poke-number')
const pokemonImg = document.querySelector('.pokemon-img')

const form = document.querySelector('.form')
const input = document.querySelector('.search-input')

let searchId = 25

// consulta a API  de Pokemons
const getPokemon = async pokemon => {
  const APIresponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  )

  if (APIresponse.status == 200) {
    const data = await APIresponse.json()
    return data
  }
}

const renderPokemon = async pokemon => {
  const data = await getPokemon(pokemon)

  if (data) {
    // acessa e renderiza o nome
    pokeName.innerHTML = data.name
    // acessa e renderiza o id
    pokeNumber.innerHTML = `${data.id} - `
    //acessa e renderiza a Imagem (GIF)
    const img = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    pokemonImg.setAttribute('src', img)
    // botões de prev e next continuam de onde estao
    searchId = data.id
    
    input.value = ''
  } else {
    pokeNumber.innerHTML = '? -'
    pokeName.innerHTML = 'Not Found'
    pokemonImg.setAttribute('src', null)
    input.value = ''
  }
}

form.addEventListener('submit', e => {
  e.preventDefault()

  renderPokemon(input.value.toLowerCase())
})

renderPokemon(searchId)

//Btn proximo pokemon
const nextBtn = document.querySelector('.next-btn')
nextBtn.addEventListener('click', () => {
  searchId += 1
  renderPokemon(searchId)
})

//Btn pokemon anterior
const prevBtn = document.querySelector('.prev-btn')
prevBtn.addEventListener('click', () => {
  if (searchId > 0) {
    searchId -= 1
    renderPokemon(searchId)
  }
})
