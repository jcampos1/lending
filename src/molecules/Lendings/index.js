import { Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { getLendings, getUsers, getLendingsByUser, isSuperuser, getCurrentCapital } from '../../utils';

const Lendings = () => {
    const [lendings, setLendings] = useState(null);
    const [lendingSelected, setLendingSelected] = useState(null);
    const [users, setUsers] = useState(null);
    const history = useHistory();

    useEffect(() => {
        getAllLendings();
        getUsers().then(response => setUsers(response));
    }, []);

    const getAllLendings = () => {
        const user = JSON.parse(localStorage.getItem("user"));
        getLendings(user.rol).then(response => {
            const promiseLendings = response.map(async lending => {
                const responseLen = await getCurrentCapital(lending);
                return {
                    ...lending,
                    currentCapital: responseLen
                }
            });
            Promise.all(promiseLendings).then(newLendings => {
                setLendings(newLendings);
            })
        });
    }

    const searchLendingsByUser = e => {
        if(e.target.value !== "Todos") {
            const user = JSON.parse(e.target.value);
            getLendingsByUser(user).then(response => {
                const promiseLendings = response.map(async lending => {
                    const responseLen = await getCurrentCapital(lending);
                    return {
                        ...lending,
                        currentCapital: responseLen
                    }
                });
                Promise.all(promiseLendings).then(newLendings => {
                    setLendings(newLendings);
                })
            });
        } else {
            getAllLendings();
        }
    }

    const onChangeLendingSelected = lending => {
        setLendingSelected(lending)
    }

    const goToContract = () => history.push(`/lendings/${lendingSelected}`);
    const goToPayments = () => history.push(`/lendings/${lendingSelected}/payments`);

    if(!lendings) {
        return <div className="loading" />
    }

    return (
        <>
            {
                isSuperuser() && users && (
                    <div className="bg-light rounded p-3 mb-4">
                        <small className="d-block font-weight-bold mb-1">Filtrar por usuario:</small>
                        <select 
                            className="d-flex"
                            onChange={e => searchLendingsByUser(e)}>
                            <option value={null}>
                                Todos
                            </option>
                            {
                                users.map((user, index) => (
                                    <option value={JSON.stringify(user)}>
                                        {user.name}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                )
            }
            {
                lendings.length === 0 ? (
                    <div>
                        <img 
                            src="https://cdn.iconscout.com/wordpress/2017/08/empty-states-icons-by-tony-murphy-5989f8c6ee8b4.gif"
                            width="100"
                            height="100" />
                        <h2 className="text-center">Sin resultados de busqueda</h2>
                    </div>
                ) : (
                    <>
                        <div className="d-flex align-items-center justify-content-end mb-4">
                            <Button 
                                variant="success" 
                                size="sm" 
                                className="mr-3"
                                disabled={!lendingSelected}
                                onClick={goToPayments}>
                                Historial de pagos
                            </Button>
                            <Button 
                                variant="primary" 
                                size="sm"
                                disabled={!lendingSelected}
                                onClick={goToContract}
                                >
                                Ver contrato
                            </Button>
                        </div>
                        {
                            lendings.map((lending, index) => (
                                <div 
                                    key={`lending${index}`}
                                    className="border-top border-bottom border-right py-3 px-3 px-md-5 shadow-sm animate__animated animate__backInUp mb-4"
                                    style={{
                                        borderLeft: "5px solid #ffd700",
                                        cursor: "pointer"
                                    }}
                                    onClick={() => onChangeLendingSelected(lending.id)}
                                    >
                                        <div className="d-flex align-items-center">
                                            <input 
                                                type="radio" 
                                                checked={lendingSelected === lending.id} 
                                                className="mr-3" />
                                            <Row>
                                                <Col xs="6">
                                                    <small className="d-block font-weight-bold">Prestamista</small>
                                                    <div className="text-capitalize">
                                                        {`${lending.lender.name.split(" ")[0]} ${lending.lender.lastName.split(" ")[0]}`}
                                                    </div>
                                                </Col>
                                                <Col xs="6">
                                                    <small className="d-block font-weight-bold">Prestatario</small>
                                                    <div className="text-capitalize">
                                                        {`${lending.borrower.name.split(" ")[0]} ${lending.borrower.lastName.split(" ")[0]}`}
                                                    </div>
                                                </Col>
                                                <Col xs="6">
                                                    <small className="d-block font-weight-bold">Capital inicial</small>
                                                    <div>
                                                        {lending.capital}$
                                                    </div>
                                                </Col>
                                                <Col xs="6">
                                                    <small className="d-block font-weight-bold">Capital actual</small>
                                                    <div>
                                                        {lending.currentCapital}$
                                                    </div>
                                                </Col>
                                                <Col xs="6">
                                                    <small className="d-block font-weight-bold">Porcentaje de interés</small>
                                                    <div>
                                                        {lending.interestPercentage}%
                                                    </div>
                                                </Col>
                                                <Col md="6" >
                                                    <small className="d-block font-weight-bold">Fecha del contrato</small>
                                                    <div>
                                                        {lending.createdAt}
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                </div>
                            ))
                        }
                    </>
                )
            }
        </>
    );
}

export default Lendings;