import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { DOCUMENTS_LABELS } from '../../constants';
import { getFullName, getLendingById } from '../../utils';

const TextFormat = ({text}) => <b className="text-uppercase">{text}</b>;

const Contract = () => {
    const [lending, setLending] = useState(null);
    const match = useParams();

    useEffect(() => {
        getLendingById(parseInt(match.lendingId)).then(response => setLending(response));
    }, []);

    if(!lending) {
        return <div className="loading" />
    }

    const {lender, borrower} = lending;

    const lenderFullName = getFullName(lender.name, lender.lastName);
    const borrowerFullName = getFullName(borrower.name, borrower.lastName);

    return (
        <>
            <h2 className="mb-5 text-center">CONTRATO DE PRÉSTAMO DE DINERO</h2>
            <p className="text-justify mb-5">
                Conste por el presente documento que celebran en la fecha <TextFormat text={lending.createdAt} />, 
                de una parte el señor <TextFormat text={lenderFullName} />, de nacionalidad <TextFormat text={lender.nacionality} />, 
                identificado con {DOCUMENTS_LABELS[lender.doctType]} Nro. <TextFormat text={lender.docNumber} />, 
                domiciliado en {lender.address}, 
                a quien en adelante se le denominará <TextFormat text="“EL PRESTAMISTA”" />, y de otra parte interviene el señor(a) 
                {" "}<TextFormat text={borrowerFullName} />, de nacionalidad <TextFormat text={borrower.nacionality} />, 
                identificado con {DOCUMENTS_LABELS[borrower.doctType]} Nro. <TextFormat text={borrower.docNumber} />,  
                domiciliado en  {borrower.address}, 
                quién en adelante se le denominará <TextFormat text="“EL PRESTATARIO”" />; bajo las siguientes cláusulas:
            </p>

            <p className="text-justify mb-5">
                <u><TextFormat text="PRIMERO:" /></u> Mediante el presente contrato el prestamista da en calidad de préstamo de dinero, a favor del prestatario la suma total de {" "} 
                <TextFormat text={lending.capitalText} /> <TextFormat text={`(${lending.capital} $)`} />, importe total que el prestatario declarará que efectivamente recibe dicha 
                suma total y en señal de conformidad firma el presente contrato.
            </p>

            <p className="text-justify mb-5">
                <u><TextFormat text="SEGUNDO:" /></u> De común acuerdo entre las partes manifiestan que en el presente préstamo habrá 
                interés del <TextFormat text={`${lending.interestPercentage}%`} />, capital que mensualmente será abonado al prestamista a través de la 
                forma que él disponga o sea de común acuerdo entre las partes, sea mediante efectivo o transferencia.
            </p>

            <p className="text-justify mb-5">
                <u><TextFormat text="TERCERO:" /></u> El monto a pagar mensualmente por el prestatario, será <TextFormat text="reducido" />{" "} 
                cuando el prestatario abone el interés correspondiente y parte del capital prestado inicialmente.
            </p>

            <p className="text-justify mb-5">
                <u><TextFormat text="CUARTO:" /></u> Para mayor garantía del pago, el prestatario pone como garantía 
                {" "}<TextFormat text={lending.warranty} />, y estando de acuerdo ambas partes firman el presente contrato en señal de conformidad.
            </p>

            <p className="text-justify mb-5">
                <u><TextFormat text="QUINTO:" /></u> Las partes declaran dar fiel cumplimiento al presente contrato 
                renunciando a formular cualquier acción modificatoria de rescisión o resolución del mismo, por este 
                u otro concepto análogo. Para ello dan por vencido todo término legal o judicial, para pedir o 
                intentar la nulidad de la presente.
            </p>
            <Row>
                <Col>
                    <div className="border px-5 text-center d-flex flex-column">
                        <b className="mb-5">Prestatario,</b> 
                        <h6 style={{
                            height: "40px"
                        }}
                        className="d-flex justify-content-center align-items-end mb-0">
                            {borrowerFullName}
                        </h6>
                        <hr className="mb-0 w-100 mt-0" />
                        <span>{borrowerFullName}</span>
                        <span>{borrower.doctType}: {borrower.docNumber}</span>
                    </div>
                </Col>
                <Col className="mt-3 mt-md-0">
                    <div className="border px-5 text-center d-flex flex-column">
                        <b className="mb-5">Prestamista,</b> 
                        <img 
                            src="/images/signature-junior.png" 
                            alt="signature" 
                            width="150" 
                            height="40"
                            className="mx-auto mb-0" />
                        <hr className="mb-0 w-100 mt-0" />
                        <span>{lenderFullName}</span>
                        <span>{lender.doctType}: {lender.docNumber}</span>
                    </div>
                </Col>
            </Row>
        </>
    );
}

export default Contract;