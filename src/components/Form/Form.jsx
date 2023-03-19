import { useState } from 'react';
import { Button, Form, Input, Label } from './Form.styled';

export function ContactForm({ addContact }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = e => {
    switch (e.target.name) {
      case `name`:
        setName(e.target.value);
        break;
      case `number`:
        setNumber(e.target.value);
        break;
      default:
        return;
    }
  };

  const clearState = () => {
    setName('');
    setNumber('');
    // this.setState({
    // name: '',
    // number: '',
    // });
  };

  const clearStateName = () => {
    setName('');
    // this.setState({
    // name: '',
    // });
  };

  return (
    <>
      <Form>
        <Label htmlFor="">
          Name:
          <Input
            value={name}
            onChange={handleChange}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. 
For example Adrian, Jacob Mercer, Charles de Batz de Castelmore 
d'Artagnan"
            required
          />
        </Label>
        <Label htmlFor="">
          Number:
          <Input
            value={number}
            onChange={handleChange}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can 
start with +"
            required
          />
        </Label>
        <Button
          type="button"
          onClick={() => addContact(name, number, clearState, clearStateName)}
        >
          Add contact
        </Button>
      </Form>
    </>
  );
}
