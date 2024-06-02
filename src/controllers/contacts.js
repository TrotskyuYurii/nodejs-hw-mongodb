import {getAllContacts,getContactsById,createNewContact} from '../services/contacts.js';






export const getDefaultController = async (req, res) => {
    res.status(200).json({
        status: 200,
        message: 'Welcome to Contacts API!',
        data: [],
    });
}




export const getAllContactsController = async (req, res) => {
    const contactsfound = await getAllContacts();
    res.status(200).json({
        status: 200,
        message: 'Successfully found contacts!',
        data: contactsfound,
    });
};




export const getContactsByIdController =   async (req, res) => {

    const id = req.params.contactid;

        const contactsfound = await getContactsById(id);

        // if (!contactsfound || contactsfound.length === 0) {
        //     return res.status(404).json({
        //         status: 404,
        //         message: `Contact with id ${id} not found!`,
        //         data: [],
        //     });
        // }

        res.status(200).json({
            status: 200,
            message: `Successfully found contact with id ${id}!`,
            data: contactsfound,
        });

};



export const postNewContactController = async (req, res) => {

    const {body} = req;
    const newContact = await createNewContact(body);

    res.status(201).json({
        status: 201,
        message: 'Successfully created a contact!',
        data: newContact,
    });
}