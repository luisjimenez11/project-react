import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { login as loginCreator } from '../../redux/users/thunks'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'

const LoginContainer = (props) => {

  const {
    login,
    error,
    loading
  } = props

  const [values, setValues] = useState({
    email: '',
    password: '',
    show: true
  })

  const handleChange = (event) => {
    const {
      name,
      value
    } = event.target

    setValues({
      ...values,
      [name]: value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    login(values.email, values.password)
  }


  return(
    <Container>
      <Row className="justify-content-md-center">
        <h2>Inicio de Sesion</h2>
      </Row>
        
      {error && (
        <Row className="justify-content-md-center">
          <Col md={4}>
            <Alert variant="danger">
              {error}
            </Alert>
          </Col>
        </Row>
      )}

      <Row className="justify-content-md-center">
        <Col md={4}>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="email"
                name='email'
                value={values['']}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control 
                type="password"
                name='password'
                value={values['']}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Link to='/register'>Registrarse</Link>
            </Form.Group>
            <Button variant="primary" type="submit">Iniciar Sesion</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

const mapStateToProps = state => {
  const {
    loading,
    error
  } = state.users

  return {
    loading,
    error
  }
}

const mapDispatchToProps = {
  login: loginCreator
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)