import React from 'react';
import { Container } from 'react-bootstrap';
import Header from '../molecules/Header';
import Performance from '../molecules/Performance';

const PerformancePage = () => {
    return (
        <>
            <Header />
            <Container className="mt-3 mt-md-5 mb-4">
                <h3 className="mb-4">
                    Métricas de evaluación
                </h3>
                <Performance />
            </Container>
        </>
    );
}

export default PerformancePage;