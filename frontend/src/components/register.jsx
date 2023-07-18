import { useRef, useState } from 'react';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Register() {
    const [error, SetError] = useState(false);
    const userNameRef = useRef();
    const userEmailRef = useRef();
    const userPasswordRef = useRef();
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('username', userNameRef.current.value);
        console.log('userEmailRef', userEmailRef.current.value);
        console.log('userPasswordRef', userPasswordRef.current.value);
        try {
          const res = await axios.post('auth/register', {
            username: userNameRef.current.value,
            email: userEmailRef.current.value,
            password: userPasswordRef.current.value,
          });
          console.log(res);
          SetError(false);
        } catch(err) {
          if (err.response.data.code === 11000) {
            SetError(true)
          }
          console.log(err);
        }
    }
  return (
    <div class="card" style={{ width: '28rem',marginTop:'5rem',marginLeft:'40rem' }}>
    <Form className="container mt-5">
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control ref={userNameRef} type="text" placeholder="Enter username" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control ref={userEmailRef} type="email" placeholder="Enter email" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control ref={userPasswordRef} type="password" placeholder="Password" />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
      {error && (
<Alert className="mt-2" key="danger" variant="danger">
          username/email already exist !
      </Alert>        
      )}
    </Form>
    </div>
  );
}


export default Register;