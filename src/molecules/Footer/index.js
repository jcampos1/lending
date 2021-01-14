import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className="mt-3 mt-md-5 px-3 px-md-0 py-3">
            <Container className="d-flex align-items-center justify-content-between">
                <span>Copyright © 2021</span>
                <div>
                    <a 
                        href="https://www.facebook.com/junior9192" 
                        target="_blank"
                        className="hvr-wobble-top">
                        <img 
                            src="https://i.pinimg.com/originals/ce/c8/a6/cec8a6239de29acbfcfee0ccec995b9f.png"
                            alt="face"
                            width="60"
                            height="60"
                            className="animate__animated animate__zoomIn" />
                    </a>
                    <a 
                        href="https://www.instagram.com/juniorcampos7441/" 
                        target="_blank"
                        className="hvr-wobble-top">
                        <img 
                            src="https://i.pinimg.com/originals/79/7a/fe/797afe1351677d0ad8787224e6a5be2a.png"
                            alt="instagram"
                            width="60"
                            height="60"
                            className="animate__animated animate__zoomIn animate__delay-1s" />
                    </a>
                </div>
            </Container>
        </footer>
    );
}

export default Footer;