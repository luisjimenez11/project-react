import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { getCharacters } from '../../redux/characters/thunks'
import { addFavoriteCharacter } from '../../redux/users'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const CharacterContainer = props => {
  const {
    getCharacters,
    addFavoriteCharacter,
    loanding,
    characters,
    error,
    user
  } = props

  useEffect(() => {
    (characters.length === 0 && getCharacters())
  }, [])

  const charactersNotFavorites = characters.filter(item => {
    return !user.favoriteCharacters.includes(item.id);
  })

  const charactersFavorites = characters.filter(item => {
    return user.favoriteCharacters.includes(item.id);
  })

  console.log(characters)
  return(
    <div className="Characters">
      <Container>
        {error}
        {loanding && (
          <div>Loanding</div>
        )}
        {!loanding && (
          <Row>
            {!loanding && charactersFavorites.map((character, index) =>(
              <Col md={4} key={index}>
                <Card bg="primary" text="white" style={{ marginBottom:'20px', marginTop:'20px'}}>
                  <Card.Img variant="top" src={character.image} />
                  <Card.Body>
                    <Card.Title>{character.name}</Card.Title>
                    <Card.Text>{character.status}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}

            {!loanding && charactersNotFavorites.map((character, index) =>(
              <Col md={4} key={index}>
                <Card style={{ marginBottom:'20px', marginTop:'20px'}}>
                  <Card.Img variant="top" src={character.image} />
                  <Card.Body>
                    <Card.Title>{character.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{character.status}</Card.Subtitle>
                    <Button onClick={ () => addFavoriteCharacter(character.id)} variant="primary">Añadir a Favoritos</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  )
}
const mapStateToProps = state => {
  const {
    loading,
    entities,
    error
  } = state.characters

  const {
    users,
    loggedIn
  } = state.users

  return {
    loading,
    characters: entities,
    error,
    user: users[loggedIn]
  }
}

const mapDispatchToProps = {
  getCharacters,
  addFavoriteCharacter
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterContainer);

