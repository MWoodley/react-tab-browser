import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button, Modal } from "react-bootstrap";

function AddRowForm(props) {
  const initialData = {
    track: "",
    artist: "",
    album: "",
    part: "",
    tuning: "",
    notes: "",
  };

  const initialErrors = {
    track: false,
    artist: false,
    tuning: false,
  };

  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState(initialErrors);

  const onFieldUpdate = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.name === "tuning"
          ? e.target.value.toUpperCase()
          : e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    var newErrors = {};
    var hasErrors = false;
    console.log(formData);
    if (formData.track.length === 0) {
      newErrors.track = "Track name is required";
      hasErrors = true;
    }
    if (formData.artist.length === 0) {
      newErrors.artist = "Artist name is required";
      hasErrors = true;
    }
    if (formData.tuning.length === 0) {
      newErrors.tuning = "A tuning is required";
      hasErrors = true;
    }
    if (hasErrors) {
      setErrors(newErrors);
      return;
    }
    setErrors(initialErrors);
    props.onSubmit(formData);
    props.handleModalClose();
    setFormData(initialData);
  };

  const clearForm = (e) => {
    e.preventDefault();
    props.handleModalClose();
    setFormData(initialData);
  };

  return (
    <div>
      <Modal.Header closeButton>
        <Modal.Title>Add Track</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Form.Group as={Row} controlId="addRowForm.track">
            <Form.Label column sm={2}>
              Track
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                name="track"
                autoCapitalize="true"
                autoComplete="false"
                placeholder="Crocodile"
                value={formData.track}
                onChange={onFieldUpdate}
                isInvalid={errors.track !== false}
              />
              <Form.Control.Feedback type="invalid">
                {errors.track}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="addRowForm.artist">
            <Form.Label column sm={2}>
              Artist
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                name="artist"
                autoCapitalize="true"
                autoComplete="false"
                placeholder="TTNG"
                value={formData.artist}
                onChange={onFieldUpdate}
                isInvalid={errors.artist !== false}
              />
              <Form.Control.Feedback type="invalid">
                {errors.artist}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="addRowForm.album">
            <Form.Label column sm={2}>
              Album
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                name="album"
                autoCapitalize="true"
                autoComplete="false"
                placeholder="Animals"
                value={formData.album}
                onChange={onFieldUpdate}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="addRowForm.part">
            <Form.Label column sm={2}>
              Part Label
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                name="part"
                autoCapitalize="true"
                autoComplete="false"
                placeholder="Lead Guitar"
                value={formData.part}
                onChange={onFieldUpdate}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="addRowForm.tuning">
            <Form.Label column sm={2}>
              Tuning
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                name="tuning"
                autoComplete="false"
                placeholder="EADGBE"
                value={formData.tuning}
                onChange={onFieldUpdate}
                isInvalid={errors.tuning !== false}
              />
              <Form.Control.Feedback type="invalid">
                {errors.tuning}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="addRowForm.notes">
            <Form.Label column sm={2}>
              Notes
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                as="textarea"
                rows="4"
                name="notes"
                autoComplete="false"
                placeholder="Capo on fret 3"
                value={formData.notes}
                onChange={onFieldUpdate}
              />
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={clearForm}>
          Close
        </Button>
        <Button variant="primary" onClick={onSubmit}>
          Save Track
        </Button>
      </Modal.Footer>
    </div>
  );
}

export default AddRowForm;
