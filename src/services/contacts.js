import mongoose from 'mongoose';
import createHttpError from 'http-errors';
import {ContactCollection} from '../models/contact.js';


// Додаткова функція для розрахунку параметрів пагінації
const createPaginationInformation = (page, perPage, count) => {
    const totalPages = Math.ceil(count / perPage);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;
  
    return {
      page,
      perPage,
      totalItems: count,
      totalPages,
      hasPreviousPage,
      hasNextPage,
    };
  };




  export const getAllContacts = async ({page=1, perPage=10, sortBy="_id", sortOrder="asc", userId}) => {
    //Параметри пагінації
    const count = await ContactCollection.countDocuments({ userId });
    const paginationInformation = createPaginationInformation(page, perPage, count);
    
    const dataContacts = await ContactCollection
        .find({ userId })
        .skip((page - 1) * perPage)
        .limit(perPage)
        .sort({ [sortBy]: sortOrder })
        .exec();

    return {
        data: dataContacts,
        ...paginationInformation
    };
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


export const createNewContact = async (payload, userId) => {

    const newContact = await ContactCollection.create({...payload, userId:userId});
    return newContact;
}


export const patchContactsById = async (id, payload, options = {}) => {

    const pathContacts = await ContactCollection.findByIdAndUpdate(id, payload, {new: true,includeResultMetadata: true, ...options});

    if (!pathContacts || !pathContacts.value) {
        throw createHttpError(404, `Contact not found`);
    }

    return pathContacts.value;
}


export const deleteContactsById = async (id) => {
    const idobj = { _id: id };
    const contactsdeleted = await ContactCollection.findByIdAndDelete(idobj);
    if (!contactsdeleted) {
        throw createHttpError(404, `Contact with id ${id} not found!`);
    }
    return contactsdeleted;
}