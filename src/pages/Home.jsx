import React, { useState, useEffect } from 'react';
import { getContacts, createContact, updateContact, deleteContact } from '../services/api';
import { useAuth } from '../hooks/useAuth';

function Home() {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({ firstName: '', lastName: '', company: '', address: '', phones: [], email: '', isPublic: false });
  const { user } = useAuth();

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const { data } = await getContacts();
        setContacts(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchContacts();
  }, []);

  const handleChange = (e) => {
    setNewContact({ ...newContact, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await createContact(newContact);
      setContacts([...contacts, data]);
      setNewContact({ firstName: '', lastName: '', company: '', address: '', phones: [], email: '', isPublic: false });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteContact(id);
      setContacts(contacts.filter(contact => contact._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleVisibilityToggle = async (id, isVisible) => {
    try {
      await updateContact(id, { isVisible: !isVisible });
      setContacts(contacts.map(contact => (contact._id === id ? { ...contact, isVisible: !isVisible } : contact)));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Contacts</h2>
      {user && (
        <form onSubmit={handleSubmit}>
          <input type="text" name="firstName" value={newContact.firstName} onChange={handleChange} placeholder="First Name" required />
          <input type="text" name="lastName" value={newContact.lastName} onChange={handleChange} placeholder="Last Name" required />
          <input type="text" name="company" value={newContact.company} onChange={handleChange} placeholder="Company" />
          <input type="text" name="address" value={newContact.address} onChange={handleChange} placeholder="Address" />
          <input type="text" name="phones" value={newContact.phones} onChange={handleChange} placeholder="Phones" />
          <input type="email" name="email" value={newContact.email} onChange={handleChange} placeholder="Email" required />
          <label>
            Public
            <input type="checkbox" name="isPublic" checked={newContact.isPublic} onChange={() => setNewContact({ ...newContact, isPublic: !newContact.isPublic })} />
          </label>
          <button type="submit">Add Contact</button>
        </form>
      )}
      <ul>
        {contacts.map(contact => (
          <li key={contact._id}>
            <h3>{contact.firstName} {contact.lastName}</h3>
            <p>{contact.company}</p>
            <p>{contact.address}</p>
            <p>{contact.phones.join(', ')}</p>
            <p>{contact.email}</p>
            {user && (
              <>
                <button onClick={() => handleDelete(contact._id)}>Delete</button>
                <button onClick={() => handleVisibilityToggle(contact._id, contact.isVisible)}>
                  {contact.isVisible ? 'Hide' : 'Show'}
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
