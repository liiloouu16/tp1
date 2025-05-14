import request from 'supertest'
import { app } from '../src'
import { prismaMock } from './jest.setup'

describe('PokemonCard API', () => {
  //fetch all PokemonCards - ok
  describe('GET /pokemon-cards', () => {
    it('should fetch all PokemonCards', async () => {
      const mockPokemonCards = [
        {
          id: 1,
          name: 'Flamiaou',
          pokedexId: 725,
          type: { id: 1, name: 'Fire' },
          typeId: 2,
          lifePoints: 70,
          size: 0.7,
          weight: 4,
          imageUrl:
            'https://www.pokepedia.fr/images/thumb/6/6c/Flamiaou-USUL.png/800px-Flamiaou-USUL.png',
        },
      ]
      prismaMock.pokemonCard.findMany.mockResolvedValue(mockPokemonCards)
      const response = await request(app).get('/pokemons-cards')

      expect(response.status).toBe(200)
      expect(response.body).toEqual(mockPokemonCards)
    })
  })

  //fetch PokemonCards by id - ok
  describe('GET /pokemon-cards/:pokemonCardId', () => {
    it('should fetch a PokemonCard by ID', async () => {
      const mockPokemonCard = {
        id: 1,
        name: 'Flamiaou',
        pokedexId: 725,
        typeId: 2,
        type: { id: 1, name: 'Fire' },
        lifePoints: 70,
        size: 0.7,
        weight: 4,
        imageUrl:
          'https://www.pokepedia.fr/images/thumb/6/6c/Flamiaou-USUL.png/800px-Flamiaou-USUL.png',
      }
      prismaMock.pokemonCard.findUnique.mockResolvedValue(mockPokemonCard)
      const response = await request(app).get('/pokemons-cards/1')

      expect(response.status).toBe(200)
      expect(response.body).toEqual(mockPokemonCard)
    })

    it('should return 404 if PokemonCard is not found', async () => {
      const mockPokemonCard = null
      prismaMock.pokemonCard.findUnique.mockResolvedValue(mockPokemonCard)
      const response = await request(app).get('/pokemons-cards/999')

      expect(response.status).toBe(404)
      expect(response.body).toEqual({ error: 'Pokemon non trouvé' })
    })
  })

  //create a PokemonCard
  describe('POST /pokemon-cards', () => {
    it('should create a new PokemonCard', async () => {
      const createdPokemonCard = {
        id: 1,
        name: 'Flamiaou',
        pokedexId: 725,
        typeId: 2,
        type: { id: 1, name: 'Fire' },
        lifePoints: 70,
        size: 0.7,
        weight: 4,
        imageUrl:
          'https://www.pokepedia.fr/images/thumb/6/6c/Flamiaou-USUL.png/800px-Flamiaou-USUL.png',
      }
      prismaMock.pokemonCard.create.mockResolvedValue(createdPokemonCard)
      const response = await request(app)
        .post('/pokemons-cards')
        .set('Authorization', 'Bearer mockedToken')
        .send(createdPokemonCard)

      expect(response.status).toBe(201)
      expect(response.body).toEqual(createdPokemonCard)
    })
  })

  //update a PokemonCard
  describe('PATCH /pokemon-cards/:pokemonCardId', () => {
    it('should update an existing PokemonCard', async () => {
      const updatedPokemonCard = {
        id: 1,
        name: 'Flamiaou',
        pokedexId: 725,
        typeId: 2,
        type: { id: 1, name: 'Fire' },
        lifePoints: 70,
        size: 0.7,
        weight: 4,
        imageUrl:
          'https://www.pokepedia.fr/images/thumb/6/6c/Flamiaou-USUL.png/800px-Flamiaou-USUL.png',
      }
      prismaMock.pokemonCard.update.mockResolvedValue(updatedPokemonCard)
      const response = await request(app)
        .patch('/pokemons-cards/1')
        .set('Authorization', 'Bearer mockedToken')
        .send(updatedPokemonCard)

      expect(response.status).toBe(200)
      expect(response.body).toEqual(updatedPokemonCard)
    })
  })

  //delete a PokemonCard
  describe('DELETE /pokemon-cards/:pokemonCardId', () => {
    it('should delete a PokemonCard', async () => {
      const mockPokemonCard = {
        id: 1,
        name: 'Flamiaou',
        pokedexId: 725,
        typeId: 2,
        type: { id: 1, name: 'Fire' },
        lifePoints: 70,
        size: 0.7,
        weight: 4,
        imageUrl:
          'https://www.pokepedia.fr/images/thumb/6/6c/Flamiaou-USUL.png/800px-Flamiaou-USUL.png',
      }
      prismaMock.pokemonCard.delete.mockResolvedValue(mockPokemonCard)
      const response = await request(app)
        .delete('/pokemons-cards/1')
        .set('Authorization', 'Bearer mockedToken')

      expect(response.status).toBe(204)
    })
  })
})
