import React from 'react';
import { Container } from 'react-bootstrap';
import Header from '../molecules/Header';
import Lendings from '../molecules/Lendings';

const LendingsPage = () => {
    return (
        <>
            <Header />
            <Container className="mt-3 mt-md-5">
                <h3 className="mb-4">
                    Listado de préstamos
                </h3>
                <Lendings />
            </Container>
        </>
    );
}

export default LendingsPage;