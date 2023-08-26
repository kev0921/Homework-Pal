"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const contactModel_1 = __importDefault(require("../models/contactModel"));
const mongoose_1 = __importDefault(require("mongoose"));
//get all contacts
const getContacts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contacts = yield contactModel_1.default.find({}).sort({ createdAt: -1 });
    res.status(200).json(contacts);
});
//get a single contact
const getContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such contact' });
    }
    const contact = yield contactModel_1.default.findById(id);
    if (!contact) {
        return res.status(404).json({ error: 'No such contact' });
    }
    res.status(200).json(contact);
});
// create new contact
const createContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, number, email } = req.body;
    let emptyFields = [];
    if (!name) {
        emptyFields.push('name');
    }
    if (!number) {
        emptyFields.push('number');
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in the required fields', emptyFields });
    }
    // add doc to db
    try {
        const contact = yield contactModel_1.default.create({ name, number, email });
        res.status(200).json(contact);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: 'Server error' });
        }
    }
});
// delete a contact
const deleteContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such contact' });
    }
    const contact = yield contactModel_1.default.findOneAndDelete({ _id: id });
    if (!contact) {
        return res.status(400).json({ error: 'No such contact' });
    }
    res.status(200).json(contact);
});
// update a contact
const updateContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such contact' });
    }
    const contact = yield contactModel_1.default.findOneAndUpdate({ _id: id }, Object.assign({}, req.body));
    if (!contact) {
        return res.status(400).json({ error: 'No such contact' });
    }
    res.status(200).json(contact);
});
module.exports = {
    getContacts,
    getContact,
    createContact,
    deleteContact,
    updateContact
};
