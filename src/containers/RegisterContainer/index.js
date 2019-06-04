import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addUser as addUserCreator } from '../../redux/users/thunks'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const RegisterContainer = (props) => {
  const {
    loading,
    addUser,
    error
  } = props

  const [values, setValues] = useState({
    name: '',
    password: '',
    email: '',
  })

  const handleChange = (e) => {
    const {
      name,
      value
    } = e.target

    setValues({
      ...values,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addUser(values)
  }

  return(
    <Container>
      <Row className="justify-content-md-center">
        <h2>Registro de Usuario</h2>
      </Row>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row}>
              <Form.Label column sm="2">Usuario</Form.Label>
              <Col sm="10">
                <Form.Control 
                  type="text"
                  name='name'
                  value={values['name']}
                  onChange={handleChange}
                 />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="2">Email</Form.Label>
              <Col sm="10">
                <Form.Control
                  type="email"
                  name='email'
                  value={values['email']}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="2">Password</Form.Label>
              <Col sm="10">
                <Form.Control 
                  type='password'
                  name='password'
                  value={values['password']}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>
            <Form.Group className="justify-content-md-center">
              <Button className="mx-auto d-block" variant="primary" type="submit">Registrarse</Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

const msp = state => {
  const {
    loading,
    error
  } = state.users

  return {
    loading,
    error
  }
}

const mdp = {
  addUser: addUserCreator
}

export default connect(msp, mdp)(RegisterContainer)