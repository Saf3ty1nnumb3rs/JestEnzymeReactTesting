import React from 'react';
import { mount } from 'enzyme';
import { format } from 'date-fns';
import App from './App';

describe('App', () => {
    let app = mount(<App />);

    it('renders the App title - App.js', () => {
        // console.log(app.debug());
        expect(app.find('h2').text()).toEqual('Note To Self');
    });
// USE AT when more than one element will be returned
    it('renders the clear button', () => {
        expect(app.find('.btn').at(1).text()).toEqual('Clear Notes');
    });

    describe('when rendering the form - App.js', () => {
        it('creates a Form component', () => {
            expect(app.find('Form').exists()).toBe(true);
        });

        it('renders a FormControl component', () => {
            expect(app.find('FormControl').exists()).toBe(true);
        });

        it('renders a Submit Button', () => {
            expect(app.find('.btn').at(0).text()).toEqual('Submit');
        })
    });

    describe('when creating a note', () => {
        let testNote = 'Test Note';

        beforeEach(() => {
            app.find('FormControl').simulate('change', {
                target: { value: testNote }
            });
        });

        it('updates the text in state', () => {
          expect(app.state().text).toEqual(testNote);
        });

        describe('and submitting the new note', () => {
          beforeEach(() => {
            app.find('.btn').at(0).simulate('click');
          });

          afterEach(() => {
            app.find('.btn').at(1).simulate('click');
          });

          it('adds the new value to state', () => {
            console.log(app.state());
            expect(app.state().notes[0].text).toEqual(testNote)
          });

          describe('and remounting the component', () => {
            let app2;

            beforeEach(() => {
              app2 = mount(<App />);
            });

            it('reads the stored note cookie', () => {
              expect(app2.state().notes[0].text).toEqual(testNote)
              expect(app2.state().notes[0].createdAt).toEqual(format(new Date(), 'Pp'))
            })
          })
          describe('and clicking the clear button', () => {
             beforeEach(() => {
              app.find('.btn').at(1).simulate('click');
             });

             it('clears the notes in state', () => {
              expect(app.state().notes).toEqual([]);
             });
          })
        });
    });
});
