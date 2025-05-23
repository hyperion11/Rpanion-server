//import basePage from './basePage.js'
import { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import React from 'react'

import './css/styles.css';

export default function loginPage() {
  const [username, setUserName] = useState()
  const [password, setPassword] = useState()
  const [errorMessage, setErrorMessage] = useState('');

  const handleCloseError = () => {
    // user has closed the error window
    setErrorMessage('')
  }

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json(); // Get the error response from the server

      console.log('Login:', data);

      // Check if login was successful
      if (!response.ok) {
        console.log('Login failed:', data);
        setErrorMessage(data.error)
      } else {
        // If login is successful, process the data (e.g., save token)
        localStorage.setItem('token', JSON.stringify(data));
        window.location.reload();
        
        // Clear any previous error message
        setErrorMessage('');
      }
    } catch (error) {
      // If an error occurred, set the error message
      setErrorMessage(error.message);
    }
  }

  return(
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" name="username" onChange={e => setUserName(e.target.value)}/>
        </label>
        <label>
          <p>Password</p>
          <input type="password" name="password" onChange={e => setPassword(e.target.value)}/>
        </label>
        <div>
          <Button type="submit">Submit</Button>
        </div>
      </form>
      <Modal show={errorMessage !== ''} onHide={handleCloseError}>
          <Modal.Header closeButton>
            <Modal.Title>Error</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>{errorMessage}</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="primary" onClick={handleCloseError}>OK</Button>
          </Modal.Footer>
        </Modal>
    </div>
  )
}
