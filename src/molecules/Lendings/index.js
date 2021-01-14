import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { getLendings, getUsers, getLendingsByUser, isSuperuser } from '../../utils';

const Lendings = () => {
    const [lendings, setLendings] = useState(null);
    const [users, setUsers] = useState(null);
    const history = useHistory();

    useEffect(() => {
        getAllLendings();
        getUsers().then(response => setUsers(response));
    }, []);

    const getAllLendings = () => {
        const user = JSON.parse(localStorage.getItem("user"));
        getLendings(user.rol).then(response => setLendings(response));
    }

    const searchLendingsByUser = e => {
        
        console.log("usuario", e.target.value);
        if(e.target.value !== "Todos") {
            const user = JSON.parse(e.target.value);
            getLendingsByUser(user).then(response => setLendings(response));
        } else {
            getAllLendings();
        }
    }

    const goToContract = lendingId => history.push(`/lendings/${lendingId}`);

    if(!lendings) {
        return <div className="loading" />
    }

    return (
        <>
            {
                isSuperuser() && users && (
                    <div className="bg-light rounded p-3 mb-5">
                        <small className="d-block text-right font-weight-bold mb-1">Filtrar por usuario:</small>
                        <select 
                            className="d-flex ml-auto"
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
                    lendings.map((lending, index) => (
                        <div 
                            key={`lending${index}`}
                            className="border-top border-bottom border-right py-3 px-3 px-md-5 shadow-sm animate__animated animate__backInUp mb-4"
                            style={{
                                borderLeft: "5px solid #ffd700",
                                cursor: "pointer"
                            }}
                            >
                                <div className="hvr-shrink">
                                    <Row 
                                        onClick={() => goToContract(lending.id)}>
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
                )
            }
        </>
    );
}

export default Lendings;