import { Col, Container, Row } from "react-bootstrap";

const CustomFooter = () => {
  return (
    <Container className="bg-black text-white mt-auto" fluid>
      <Row className="py-3">
        <Col className="text-center">
          <p>Developed by Ygor Garofalo</p>
          <ul className="list-unstyled d-flex justify-content-around">
            <li>
              <a href="https://github.com/iam-Igor">
                <i className="bi bi-github fs-1"></i>
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/ygor-garofalodev/">
                {" "}
                <i className="bi bi-linkedin fs-1"></i>
              </a>
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export { CustomFooter };
