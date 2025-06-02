import { useState, useEffect, useCallback } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";

function Counter() {
  const [count, setCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Trigger pulse animation on count change
  const triggerAnimation = useCallback(() => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  }, []);

  // Increase counter with animation
  const increase = useCallback(() => {
    setCount(prevCount => prevCount + 1);
    triggerAnimation();
  }, [triggerAnimation]);

  // Reset counter with animation
  const reset = useCallback(() => {
    if (count !== 0) {
      setCount(0);
      triggerAnimation();
    }
  }, [count, triggerAnimation]);

  // Decrease counter with validation and animation
  const decrease = useCallback(() => {
    if (count > 0) {
      setCount(prevCount => prevCount - 1);
      triggerAnimation();
    }
  }, [count, triggerAnimation]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event) => {
      // Prevent default only for our specific keys
      switch (event.key) {
        case 'ArrowUp':
        case '+':
        case '=':
          event.preventDefault();
          increase();
          break;
        case 'ArrowDown':
        case '-':
          event.preventDefault();
          decrease();
          break;
        case 'r':
        case 'R':
          if (event.ctrlKey || event.metaKey) {
            return; // Allow browser refresh
          }
          event.preventDefault();
          reset();
          break;
        case 'Escape':
          event.preventDefault();
          reset();
          break;
        default:
          break;
      }
    };

    // Add event listener
    document.addEventListener('keydown', handleKeyPress);

    // Cleanup event listener
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [increase, decrease, reset]);

  // Format large numbers with commas
  const formatNumber = (num) => {
    return num.toLocaleString();
  };

  // Determine if decrease button should be disabled
  const isDecreaseDisabled = count <= 0;

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6} lg={4}>
          <Card className="text-center shadow">
            <Card.Body>
              <Card.Title className="mb-3">
                🔢 Counter App
              </Card.Title>
              
              {/* Counter Display */}
              <h1 
                className={`display-4 mb-4 ${isAnimating ? 'pulse' : ''}`}
                aria-live="polite"
                aria-label={`Current count: ${count}`}
              >
                {formatNumber(count)}
              </h1>

              {/* Keyboard Shortcuts Hint */}
              <div className="mb-3 text-muted small">
                <span>Keyboard: ↑/+ Increase • ↓/- Decrease • R/Esc Reset</span>
              </div>
              
              {/* Button Controls */}
              <div className="d-grid gap-2">
                <Button 
                  variant="success" 
                  onClick={increase}
                  aria-label="Increase counter by 1"
                  className="btn-increase"
                >
                  <span className="me-2">⬆️</span>
                  Increase
                </Button>
                
                <Button 
                  variant="secondary" 
                  onClick={reset}
                  aria-label="Reset counter to zero"
                  disabled={count === 0}
                  className="btn-reset"
                >
                  <span className="me-2">🔄</span>
                  Reset
                </Button>
                
                <Button 
                  variant="danger" 
                  onClick={decrease}
                  aria-label="Decrease counter by 1"
                  disabled={isDecreaseDisabled}
                  className="btn-decrease"
                >
                  <span className="me-2">⬇️</span>
                  Decrease
                </Button>
              </div>

              {/* Counter Status */}
              <div className="mt-3">
                <small className="text-muted">
                  {count === 0 && "Ready to count!"}
                  {count === 1 && "First count!"}
                  {count > 1 && count < 10 && `Count: ${count}`}
                  {count >= 10 && count < 100 && "Double digits! 🎉"}
                  {count >= 100 && count < 1000 && "Triple digits! 🚀"}
                  {count >= 1000 && "Thousands! Amazing! 🎯"}
                </small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Counter;