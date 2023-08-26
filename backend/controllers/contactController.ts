import { Request, Response } from 'express';
import Contact from '../models/contactModel';
import mongoose from 'mongoose';

//get all contacts
const getContacts = async (req: Request, res: Response) => {
    const contacts = await Contact.find({}).sort({createdAt: -1})
    
    res.status(200).json(contacts)
}


//get a single contact
const getContact = async (req: Request, res: Response) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such contact'})
    }

    const contact = await Contact.findById(id)

    if (!contact){
        return res.status(404).json({error: 'No such contact'})
    }

    res.status(200).json(contact)
}


// create new contact
const createContact = async (req: Request, res: Response) => {    
    const {name, number, email} = req.body

    let emptyFields: string[] = []

    if (!name) {
        emptyFields.push('name')
    }
    if (!number) {
        emptyFields.push('number')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in the required fields', emptyFields })
    }

    // add doc to db
    try{
        const contact = await Contact.create({name, number, email})
        res.status(200).json(contact)
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Server error' });
        }
    }
}

// delete a contact
const deleteContact = async (req: Request, res: Response) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such contact'})
    }

    const contact = await Contact.findOneAndDelete({_id: id})

    if (!contact){
        return res.status(400).json({error: 'No such contact'})
    }

    res.status(200).json(contact)
}

// update a contact
const updateContact = async (req: Request, res: Response) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such contact'})
    }

    const contact = await Contact.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!contact){
        return res.status(400).json({error: 'No such contact'})
    }

    res.status(200).json(contact)
}


module.exports = {
    getContacts,
    getContact,
    createContact,
    deleteContact, 
    updateContact
}