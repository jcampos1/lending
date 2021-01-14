import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { getMetrics } from '../../utils';

// ganancia mensual por intereses

const MetricCard = ({
    title,
    value
}) => (
    <div
        className="p-5 shadow-sm border rounded d-flex flex-column align-items-center justify-content-center">
        <small className="text-muted font-weight-bold mb-3">
            {title}
        </small>
        <h2>{value} $</h2>
    </div>
)

const Performance = () => {
    const [metrics, setMetrics] = useState(null);
    
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        getMetrics().then(response => setMetrics(response));
    }, []);
    
    if(!metrics) {
        return <div className="loading" />;
    }

    return (
        <Row>
            <Col className="animate__animated animate__bounceInRight">
                <MetricCard 
                    title="Ganancia mensual por intereses" 
                    value={metrics.monthEarnings}/>
            </Col>
            <Col className="mt-4 mt-md-0 animate__animated animate__bounceInRight animate__delay-1s">
                <MetricCard 
                    title="Capital prestado" 
                    value={metrics.capital} />
            </Col>
        </Row>
    );
}

export default Performance;