import Contact from '../models/Contact.js';

export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ isVisible: true }).sort({ lastName: 1, firstName: 1 });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const createContact = async (req, res) => {
  const { firstName, lastName, company, address, phones, email, isPublic } = req.body;
  try {
    const contact = await Contact.create({ firstName, lastName, company, address, phones, email, owner: req.user.id, isPublic });
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const updateContact = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, company, address, phones, email, isPublic, isVisible } = req.body;
  try {
    const contact = await Contact.findByIdAndUpdate(id, { firstName, lastName, company, address, phones, email, isPublic, isVisible }, { new: true });
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  try {
    await Contact.findByIdAndDelete(id);
    res.status(200).json({ message: 'Contact deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
