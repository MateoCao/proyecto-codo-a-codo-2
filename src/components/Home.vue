<script setup>
  import Navbar from './Navbar.vue';
  import ContactsDisplay from './ContactsDisplay.vue';
  import AddContact from './AddContact.vue';
  import OpenContact from './OpenContact.vue';
  import PageFooter from './PageFooter.vue';
  import Message from './Message.vue';
  import API from '../api/api.js';

  import "../styles/home.css";

</script>

<template>
    <Navbar />
    <main>
        <section class="contact-section">
            <nav class="contacts-navbar">
                <button @click="toggleAddContactForm" class="add-btn">Añadir contacto</button>

            <AddContact
                v-show="showAddContactForm"
                @closeContactForm = "showAddContactForm = false" 
                @addContact="addContact"                
            />
                
            </nav>

            <ContactsDisplay 
                :contacts = "contacts"
                @openContactDetails="openContactDetails"
            />
        </section>

    <OpenContact
        v-show = "openContact"
        :selectedContact = "selectedContact"
        :editedContact = "editedContact"
        @closeContact = "openContact = false"
        @deleteContact = "deleteContact"
        @editContact = "editContact"
    />
    </main>

    <PageFooter />

    <Message 
        v-show="showMessage"
        :message = "message"
        :messageError = "messageError"
    />
</template>

<script >

export default {
    
  data() {
        return {
            showAddContactForm: false,
            contacts: [],
            url:'http://127.0.0.1:5000//contacts',
            openContact: false,
            selectedContact: [],
            editedContact: [],
            showMessage: false,
            message: '',
            messageError: false
        };
    },
    created() {
        this.getContacts();
    },
    methods: {

        // GET

        async getContacts() {
        try {
            const contactsData = await API.getContacts();
            this.contacts = contactsData;
        } catch (error) {
            console.error(error);
            this.openMessage(error.message);
            this.messageError = true;
        }
        },

        // POST

        async addContact(contact) {
        try {
            const contactData = await API.addContact(contact);
            const id = contactData.id;
            contact.id = id;

            this.contacts.push(contact);
            this.toggleAddContactForm();
            this.openMessage('Contacto añadido exitosamente.');
        } catch (error) {
            console.error(error);
            this.openMessage(error.message);
            this.messageError = true;
        }
        },

        // PUT

        async editContact(id, editedContact) {
        try {
            const contactData = await API.editContact(id, editedContact);

            this.openMessage(contactData);
            const index = this.contacts.findIndex(contact => contact.id === editedContact.id);

            if (index !== -1) {
                this.contacts[index] = {...editedContact};
            }

            this.selectedContact = {...editedContact} ;
        } catch (error) {
            console.error(error);
            this.openMessage(error.message);
            this.messageError = true;
        }
        },

        // DELETE

        async deleteContact(id, editedContact) {
        try {
            const data = await API.deleteContact(id);

            this.openMessage(data);
            const index = this.contacts.findIndex(c => c.id === editedContact.id);
            if (index !== -1) {
                this.contacts.splice(index, 1);
            }
                this.openContact = false;
        } catch (error) {
            console.error(error);
            this.openMessage(error.message);
            this.messageError = true;
        }
        },

        // Lógica para manejo de componentes

        toggleAddContactForm() {
            this.showAddContactForm = !this.showAddContactForm;
        },

        openContactDetails(contact) {
            this.editedContact = { ...contact };
            this.selectedContact = contact;
            this.openContact = true;
        },

        openMessage(content) {
            this.showMessage = true;
            this.message = content;
            setTimeout(() => {
                this.showMessage = false;
                this.messageError = false;
            }, 4000);
        }
    },
}

</script>
