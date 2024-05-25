import {ContactCollection} from '../models/contact.js';



export const getAllContacts = async () => {
    return await ContactCollection.find();
}

export const getContactsById = async (id) => {
    const idobj = { _id: id };


    return await ContactCollection.find(idobj);
}