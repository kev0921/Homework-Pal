const express = require('express')
const {
  createContact,
  getContacts,
  getContact,
  deleteContact,
  updateContact
} = require('../controllers/contactController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all contact routes
router.use(requireAuth)

// GET all contacts
router.get('/', getContacts)

//GET a single contact
router.get('/:id', getContact)

// POST a new contact
router.post('/', createContact)

// DELETE a contact
router.delete('/:id', deleteContact)

// UPDATE a contact
router.patch('/:id', updateContact)


module.exports = router