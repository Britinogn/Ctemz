import api from './api';
import { Contact } from '../types/script';

interface ContactsResponse {
    message?: string;
    contacts?: Contact[];
    data?: Contact[];
}

interface ContactResponse {
    message?: string;
    contact?: Contact;
    data?: Contact;
}

async function getAllContacts(): Promise<Contact[]> {
    const res: ContactsResponse = await api.get('/contact');
    return (res.contacts || res.data || []) as Contact[];
}

async function getContactById(id: string): Promise<Contact> {
    const res: ContactResponse = await api.get(`/contacts/${id}`);
    return (res.contact || res.data) as Contact;
}

async function createContact(ContactData: Partial<Contact> | FormData): Promise<Contact> {
    const res: ContactResponse = await api.post('/contact', ContactData);
    return (res.contact || res.data) as Contact;
}

async function updateContact(id: string, ContactData: Partial<Contact> | FormData): Promise<Contact> {
    const res: ContactResponse = await api.put(`/contact/${id}`, ContactData);
    return (res.contact || res.data) as Contact;
}

async function deleteContact(id: string): Promise<void> {
    await api.delete(`/contact/${id}`);
}

const ContactAPI = {
    getAllContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact
};

export default ContactAPI;