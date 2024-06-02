import mongoose from 'mongoose';
import createHttpError from 'http-errors';
import {ContactCollection} from '../models/contact.js';



export const getAllContacts = async () => {
    return await ContactCollection.find();
}


export const getContactsById = async (id) => {
    const idobj = { _id: id };

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw createHttpError(404, 'invalid ID');
      }

      const contactsfound = await ContactCollection.find(idobj);

      if (!contactsfound || contactsfound.length === 0) {
        throw createHttpError(404, `Contact with id ${id} not found!`);
    }
    return contactsfound;
}


export const createNewContact = async (payload) => {
    const newContact = await ContactCollection.create(payload);
    return newContact;
}


export const patchContactsById = async (id, payload) => {
    const idobj = { _id: id };
    const pathContacts = await ContactCollection.findByIdAndUpdate(idobj, payload, {new: true,includeResultMetadata: true, ...options});

    if (!pathContacts || !pathContacts.value) {
        throw createHttpError(404, `Contact not found`);
    }

    return pathContacts;
}


export const deleteContactsById = async (id) => {
    const idobj = { _id: id };
    const contactsdeleted = await ContactCollection.findByIdAndDelete(idobj);
    if (!contactsdeleted) {
        throw createHttpError(404, `Contact with id ${id} not found!`);
    }
    return contactsdeleted;
}