import React from 'react';
import { Container } from 'react-bootstrap';
import Footer from '../molecules/Footer';
import Header from '../molecules/Header';
import LoginForm from '../molecules/LoginForm';

const LoginPage = () => {
    return (
        <>
            <Header />
            <Container className="mt-3 mt-md-5">
                <div className="mx-auto login-form">
                    <LoginForm />
                </div>
            </Container>
            <Footer />
        </>
    );
}

export default LoginPage;