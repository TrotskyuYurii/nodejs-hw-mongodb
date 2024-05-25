import {ContactCollection} from '../models/contact.js';


export const getAllContacts = async () => {
    return await ContactCollection.find();
}

