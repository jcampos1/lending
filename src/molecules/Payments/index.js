import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { CAPITAL_PAYMENT_KEY, COLOR_CAPITAL_PAYMENT, COLOR_INTEREST_PAYMENT } from '../../constants';
import { getPaymentsByLendingId } from '../../utils';

const Payments = () => {
    const [payments, setPayments] = useState(null);
    const match = useParams();

    useEffect(() => {
        getPaymentsByLendingId(match.lendingId).then(response => setPayments(response));
    }, []);

    if(!payments) {
        return <div className="loading" />
    }

    return (
        <>
            {
                payments.length === 0 ? (
                    <div>
                        <img 
                            src="https://cdn.iconscout.com/wordpress/2017/08/empty-states-icons-by-tony-murphy-5989f8c6ee8b4.gif"
                            width="100"
                            height="100" />
                        <h2 className="text-center">Sin resultados de busqueda</h2>
                    </div>
                ) : (
                    payments.map((payment, index) => (
                        <div 
                            key={`payment${index}`}
                            className="border-top border-bottom border-right py-3 px-3 px-md-5 shadow-sm animate__animated animate__backInUp mb-4"
                            style={{
                                borderLeft: `5px solid ${payment.type === CAPITAL_PAYMENT_KEY ? COLOR_CAPITAL_PAYMENT : COLOR_INTEREST_PAYMENT}`
                            }}
                            >
                            <Row>
                                <Col xs="6" md="3">
                                    <small className="d-block font-weight-bold">Fecha de pago</small>
                                    <div className="text-capitalize">
                                        {payment.createdAt}
                                    </div>
                                </Col>
                                <Col xs="6" md="3">
                                    <small className="d-block font-weight-bold">Usuario</small>
                                    <div className="text-capitalize">
                                        {`${payment.lending.borrower.name.split(" ")[0]} ${payment.lending.borrower.lastName.split(" ")[0]}`}
                                    </div>
                                </Col>
                                <Col xs="6" md="3">
                                    <small className="d-block font-weight-bold">Monto</small>
                                    <div>
                                        {payment.amount}$
                                    </div>
                                </Col>
                                <Col xs="6" md="3">
                                    <small className="d-block font-weight-bold">Tipo de pago</small>
                                    <div>
                                        {payment.type === CAPITAL_PAYMENT_KEY ? "Abono de intereses" : "Abono al capital"}
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    ))
                )
            }
        </>
    );
}

export default Payments;