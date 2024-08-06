// Contact.js
import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  company: String,
  address: String,
  phones: [String],
  email: String,
  owner: mongoose.Schema.Types.ObjectId,
  isPublic: Boolean,
  isVisible: { type: Boolean, default: true }
});

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
