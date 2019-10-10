import React, { Component } from 'react';
import { Form, FormControl, Button, Row } from 'react-bootstrap';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
import uuidv4 from 'uuid/v4';
import { format } from 'date-fns';

// COMPONENTS
import Note from './Note';

const COOKIE_KEY = 'NOTES';

class App extends Component {
  constructor() {
    super();

    this.state = {
      text: '',
      notes: []
    }
  }

  componentDidMount() {
    this.setState({ notes: read_cookie(COOKIE_KEY) });
  }


  submit(e) {
    e.preventDefault();
    const { notes, text } = this.state;
    if (text !== '') {
      const noteList = [...notes, { id: uuidv4(), text, createdAt: format(new Date(), 'Pp') }]
      this.setState({ notes: noteList, text: '' }, () => {
        bake_cookie(COOKIE_KEY, noteList);
      })
    }
  }

  deleteNote = (id) => {
      const notes = this.state.notes.filter(note => note.id !== id);
      this.setState(prevState => {
        return {
          ...prevState,
          notes,
        }
      }, () => {
          bake_cookie(COOKIE_KEY, notes)
        });
    }

    renderList = () => {
      return(
        this.state.notes.map((note, i) => {
          return(
            <Note
              key={`${note.text}${i}`}
              note={note}
              deleteNote={this.deleteNote}
            />
            );
        })
      );
    }

    clearList = () => {
      this.setState({
        notes: [],
      });
      delete_cookie(COOKIE_KEY);
    }

    render() {
      const { notes, text } = this.state;
      return (
        <React.Fragment>
          <Row>
            <h2>Note To Self</h2>
          </Row>
          <Row>
            <Form inline>
                <FormControl onChange={event => this.setState({ text: event.target.value })} value={text} />
                  {' '}
                <Button
                  variant="warning"
                  onClick={(e) => this.submit(e)}
                >
                    Submit
                </Button>
            </Form>
          </Row>
            {notes.length > 0 && this.renderList()}
            <hr />
            <Button variant="outline-danger" onClick={() => this.clearList()}>
              Clear Notes
            </Button>
        </React.Fragment>
    );
  }  
};

export default App;