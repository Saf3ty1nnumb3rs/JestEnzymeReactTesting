import React from 'react';
import { Button, Row } from 'react-bootstrap';

const Note = (props) => {
    const { id, text } = props.note;
    return (
        <Row className="note">
            <p>{text}</p>
            <Button
              variant="danger"
              size="sm"
              onClick={() => props.deleteNote(id)}
            >
                Delete
            </Button>
        </Row>
    );
};

export default Note;