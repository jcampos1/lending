import React from 'react';
import { Container } from 'react-bootstrap';
import Contract from '../molecules/Contract';
import Header from '../molecules/Header';

const ContractPage = () => {
    return (
        <>
            <Header />
            <Container className="mt-3 mt-md-5 mb-4">
                <Contract />
            </Container>
        </>
    );
}

export default ContractPage;