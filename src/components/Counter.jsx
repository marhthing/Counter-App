import { useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";

function Counter() {
  const [count, setCount] = useState(0);

  function increase() {
    setCount(count + 1);
  }

  function reset() {
    setCount(0);
  }

  function decrease() {
    count > 0 ? setCount(count - 1) : setCount(0);
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6} lg={4}>
          <Card className="text-center shadow">
            <Card.Body>
              <Card.Title className="mb-3">🔢 Counter App</Card.Title>
              <h1 className="display-4 mb-4">{count}</h1>
              <div className="d-grid gap-2">
                <Button variant="success" onClick={increase}>Increase</Button>
                <Button variant="secondary" onClick={reset}>Reset</Button>
                <Button variant="danger" onClick={decrease}>Decrease</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Counter;
