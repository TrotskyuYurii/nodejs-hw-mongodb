import {ContactCollection} from '../models/contact.js';


export const getAllContacts = async () => {
    return await ContactCollection.find();
}

export const getContactsById = async (id) => {
    return await ContactCollection.find(id);
}