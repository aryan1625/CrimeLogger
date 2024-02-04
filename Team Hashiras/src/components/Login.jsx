import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { InputGroup, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Col } from "react-bootstrap";

export default function Login() {
  const [displayform, setDisplay] = useState(true);
  const [em_value, setEmValue] = useState("");
  const [nm_value, setNmValue] = useState("");

  const [checked_val, setCheckBoxChecked] = useState([]);
  const handleOnChange = (isChecked, value) => {
    let temp = [...checked_val];
    var pre = value.split("_")[0];
    if (isChecked) {
      temp = temp.filter((item) => item.split("_")[0] !== pre);
      temp.push(value);
      setCheckBoxChecked(temp);
      return;
    }

    setCheckBoxChecked(temp.filter((item) => item !== value));
  };

  const formSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      var existingEntries = JSON.parse(localStorage.getItem("allEntries"));
      var new_id = 0;
      if (existingEntries == null) existingEntries = [];
      else {
        let lastentry = existingEntries.slice(-1)[0];
        new_id = parseInt(lastentry["id"]) + 1;
      }
      var entry = {
        id: new_id,
        name: nm_value,
        checkbox_values: checked_val,
      };
      // Save allEntries back to local storage
      existingEntries.push(entry);
      localStorage.setItem("allEntries", JSON.stringify(existingEntries));
      setDisplay(false);
    }
  };
  return (
    <Container>
      {displayform ? (
        <Card>
          <Card.Body>
            <blockquote className="blockquote mb-0">
              FIRST INFORMATION REPORT
              (Under Section 154 Cr.P.C.) 

              (धारा 154 दंड प्रक्रिया सहिंता के तहत)
            </blockquote>
          </Card.Body>
          <Container className="padding30px">
            <Form>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="required-field">
                      1. District(ज़िला) :
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={nm_value}
                      onChange={(e) => setNmValue(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="required-field">
                      P.S.(थाना) :
                    </Form.Label>
                    <Form.Control
                      type="email"
                      value={em_value}
                      onChange={(e) => setEmValue(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="required-field">
                      Year(वर्ष) :
                    </Form.Label>
                    <Form.Control
                      type="email"
                      value={em_value}
                      onChange={(e) => setEmValue(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="required-field">
                      FIR No.(प्र.सू.रि.सं) :
                    </Form.Label>
                    <Form.Control
                      type="email"
                      value={em_value}
                      onChange={(e) => setEmValue(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="required-field">Date :</Form.Label>
                    <Form.Control
                      type="email"
                      value={nm_value}
                      onChange={(e) => setEmValue(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="required-field">
                      2. Complainant/Informant(शिकायतकर्ता/सूचनाकर्ता) :
                    </Form.Label>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label className="required-field">
                    {" "}
                    (a)Name(नाम) :
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={nm_value}
                    onChange={(e) => setNmValue(e.target.value)}
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label className="required-field">
                    {" "}
                    (b)Address(पता) :
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={nm_value}
                    onChange={(e) => setNmValue(e.target.value)}
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label className="required-field">
                    3. F.I.R. Contents(attach sperate sheet, if required)(प्रथम
                    सूचना रिपोर्ट तथ्य)
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={nm_value}
                    onChange={(e) => setNmValue(e.target.value)}
                  />
                </Form.Group>
              </Row>
              <Button className="btn_purp" onClick={(e) => formSubmit(e)}>
                Submit FIR
              </Button>
            </Form>
          </Container>
        </Card>
      ) : (
        <Card bg="light" text="dark">
          <Card.Body>
            <div className="padding30px">
              <div class="circle">
                <div class="checkmark"></div>
              </div>
            </div>
            <Card.Text>
              F.I.R submitted successfully (प्रथम सूचना रिपोर्ट सफलतापूर्वक जमा
              की गई)
            </Card.Text>
            <Form.Text muted>
              FIR published onto the blockchain successfully!
            </Form.Text>
            <div className="padding30px">
              <Button
                className="btn_purp"
                onClick={() => (window.location.href = "/submissions")}
              >
                Download FIR
              </Button>
            </div>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}
