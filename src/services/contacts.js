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
        // throw new Error('invalid ID');
      }

      const contactsfound = await ContactCollection.find(idobj);

      if (!contactsfound || contactsfound.length === 0) {
        throw createHttpError(404, `Contact with id ${id} not found!`);
        // return res.status(404).json({
        //     status: 404,
        //     message: `Contact with id ${id} not found!`,
        //     data: [],
        // });
    }
    return contactsfound;
}


export const createNewContact = async (payload) => {
    const newContact = await ContactCollection.create(payload);
    return newContact;
}

