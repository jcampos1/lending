import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { login } from "../../utils";
import {NotificationManager} from 'react-notifications';

const LoginForm = () => {
    const history = useHistory();
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const handleSubmit = () => {
        login(email, password)
        .then(() => window.location.href = "/lendings")
        .catch(() => NotificationManager.error(
            'Verifique usuario y contraseña e intente nuevamente', 
            'Error', 
            5000
        ));
    }

    return (
        <Form 
            className="px-3 py-5 px-md-5 shadow-lg rounded">
            <img 
                src="https://info.promotoraresidencial.com/hs-fs/hubfs/hipotesa.gif?width=800&name=hipotesa.gif"
                alt="gif"
                width="170"
                height="100"
                className="d-flex mx-auto" />
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Usuario</Form.Label>
                <Form.Control type="text" placeholder="Usuario" onChange={e => setEmail(e.target.value)} />
                <Form.Text className="mt-3 text-muted">
                    El usuario le fue provisto por el admin del sitio
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" placeholder="Contraseña" onChange={e => setPassword(e.target.value)} />
                <Form.Text className="mt-3 text-muted">
                    La contraseña le fue provista por el admin del sitio
                </Form.Text>
            </Form.Group>
            
            <Button block={true} variant="primary" onClick={handleSubmit} className="mt-4">
                Ingresar
            </Button>
        </Form>
    );
}

export default LoginForm;