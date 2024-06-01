import mongoose from 'mongoose';
import {ContactCollection} from '../models/contact.js';



export const getAllContacts = async () => {
    return await ContactCollection.find();
}

export const getContactsById = async (id) => {
    const idobj = { _id: id };

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('invalid ID');
      }

    return await ContactCollection.find(idobj);
}