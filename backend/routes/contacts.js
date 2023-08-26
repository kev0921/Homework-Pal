"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var _a = require('../controllers/contactController'), createContact = _a.createContact, getContacts = _a.getContacts, getContact = _a.getContact, deleteContact = _a.deleteContact, updateContact = _a.updateContact;
var router = express.Router();
// GET all contacts
router.get('/', getContacts);
// GET a single contact
router.get('/:id', getContact);
// POST a new contact
router.post('/', createContact);
// DELETE a contact
router.delete('/:id', deleteContact);
// UPDATE a contact
router.patch('/:id', updateContact);
module.exports = router;
