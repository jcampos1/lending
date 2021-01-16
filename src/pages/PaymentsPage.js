import React from 'react';
import { Container } from 'react-bootstrap';
import Header from '../molecules/Header';
import Payments from '../molecules/Payments';

const PaymentsPage = () => {
    return (
        <>
            <Header />
            <Container className="mt-3 mt-md-5">
                <h3 className="mb-4">
                    Historial de pagos
                </h3>
                <Payments />
            </Container>
        </>
    );
}

export default PaymentsPage;