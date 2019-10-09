import React, { useState, useEffect } from 'react';
import { Form, FormControl, Button, Row } from 'react-bootstrap';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
import uuidv4 from 'uuid/v4';
import { format } from 'date-fns';

// COMPONENTS
import Note from './Note';

const COOKIE_KEY = 'NOTES';

const App = () => {

    const [text, setText] = useState('');
    const [notes, setNotes] = useState([]);
    // const [sort, setSort] = useState('compareAsc');

    useEffect(() => {
      setNotes(read_cookie(COOKIE_KEY))
    }, []);

    const submit = (e) => {
      e.preventDefault();
      if (text !== '') {
        const noteList = [...notes, { id: uuidv4(), text, createdAt: format(new Date(), 'Pp') }]
        setNotes(noteList);
        bake_cookie(COOKIE_KEY, noteList);
        setText('');
      }
    }

    const deleteNote = (id) => {
      const noteList = notes.filter(note => note.id !== id);
      setNotes(noteList)
      bake_cookie(COOKIE_KEY, noteList)
    }

    const renderList = () => {
      return(
        notes.map((note, i) => {
          return(
            <Note
              key={`${note.text}${i}`}
              note={note}
              deleteNote={deleteNote}
            />
            );
        })
      );
    }

    const clearList = () => {
      setNotes([])
      delete_cookie(COOKIE_KEY);
    }

    // const toggleSort = () => {
    //   const sortValue = sort === 'compareAsc' ? 'compareDesc' : 'compareAsc';
    //   const noteList = notes.sort((a, b) => {
    //     console.log(a.createdAt, parse(a.createdAt, new Date()), b.createdAt, parse(b.createdAt, new Date()));
    //     return sortValue === 'compareAsc' ? compareAsc(parse(a.createdAt, new Date()), parse(b.createdAt, new Date())) : compareDesc(parse(a.createdAt, new Date()), parse(b.createdAt, new Date()));
    //   })
    //   console.log(noteList, sortValue);
    //   setNotes(noteList);
    //   setSort(sortValue)
    //   bake_cookie(COOKIE_KEY, noteList)
    // }
    return (
        <>
          <Row>
            <h2>Note To Self</h2>
          </Row>
          <Row>
            <Form inline>
                <FormControl onChange={event => setText(event.target.value)} value={text} />
                  {' '}
                <Button
                  variant="warning"
                  onClick={(e) => submit(e)}
                >
                    Submit
                </Button>
            </Form>
          </Row>
            {notes.length > 0 && renderList()}
            <hr />
            <Button variant="outline-danger" onClick={() => clearList()}>
              Clear Notes
            </Button>
        </>
    );
};

export default App;