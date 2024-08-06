import express from 'express';
import { getContacts, createContact, updateContact, deleteContact } from '../controllers/contactController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getContacts);
router.post('/', auth, createContact);
router.put('/:id', auth, updateContact);
router.delete('/:id', auth, deleteContact);

export default router;
