import React from 'react';
import { mount } from 'enzyme';
import Note from './Note';

describe('Note', () => {
    let props;

    props = {
        note: {
            id: 1,
            text: 'This is my note.',
        }
    }
    let note = mount(<Note {...props} />);
    it('renders the note text', () => {
        // Log the debug of the mount of the component
        // console.log(note.debug());
        // Find the node, access the text
        expect(note.find('p').text()).toEqual(props.note.text);
    });
})