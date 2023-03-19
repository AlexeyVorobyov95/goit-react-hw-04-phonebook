import { useState, useEffect } from 'react';

import { GlobalStyles } from 'components/GlobalStyles';
import { ContactsList } from 'components/Contacts/ContactsList';
import { ContactForm } from 'components/Form/Form';
import { Filter } from 'components/Filter/Filter';
import { ContainerPhoneBook, Title, Text } from 'components/App/App.styled';

export function App() {
  const [contacts, setContacts] = useState(() => {
   return JSON.parse(window.localStorage.getItem('contacts')) ?? []
  })
    
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number, clearState, clearStateName) => {
    let normalizedName = name.toLowerCase();
    if (
      contacts.find(contact => contact.name.toLowerCase() === normalizedName)
    ) {
      clearStateName();
      return alert(`${name} is already in contacts.`);
    }
    setContacts(prevContacts => {
      let id = contacts.length + 1;
      clearState();

      return [...prevContacts, { id, name, number }];
    });
  };

  const handleFilterChange = e => {
    setFilter(e.currentTarget.value);
  };

  const getFilter = () => {
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const deleteContact = contactId => {
    setContacts(() => {
      return contacts.filter(({ id }) => id !== contactId);
    });
  };

  return (
    <>
      <GlobalStyles />
      <ContainerPhoneBook>
        <ContactForm addContact={addContact} />
        <div>
          <Filter value={filter} filterChange={handleFilterChange} />
          <Title>Contacts</Title>
          {contacts.length === 0 && (
            <Text>The phonebook is empty. Please add a contact.</Text>
          )}
          <ContactsList
            contacts={getFilter()}
            onDeleteContact={deleteContact}
          />
        </div>
      </ContainerPhoneBook>
    </>
  );
}
