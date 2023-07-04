<script setup>

  import OpenContact from './OpenContact.vue';
  import Navbar from './Navbar.vue'
  import AddContact from './AddContact.vue';
  import ContactsDisplay from './ContactsDisplay.vue';
  import PageFooter from './PageFooter.vue'
  import Message from './Message.vue'
  import "../styles/home.css"

</script>

<template>
    <Navbar />
    <main>
        <section class="contact-section">
            <nav class="contacts-navbar">
                <ul class="contacts-nav-options">
                    <li @click="toggleAddContactForm">Añadir contacto</li>
                </ul>
                
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
            url:'https://mateocao.pythonanywhere.com/contacts',
            openContact: false,
            showMessage: false,
            selectedContact: [],
            editedContact: [],
            message: "",
            messageError: false
        };
    },
    created() {
        this.getContacts();
    },
    methods: {

        //Inicio Fetch

        //GET
        async getContacts() {
            try {
                const response = await fetch(this.url, {
                    method: 'GET'
                });

                const data = await response.json();
                this.contacts = data;
            } catch (error) {
                console.error(error);
            }
        },

        //POST
        async addContact(contact) {
            try {
                const response = await fetch(this.url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json', // Indicar que los datos se enviarán en formato JSON
                    },
                    body: JSON.stringify(contact), // Convertir el objeto contact a JSON
                });

                const data = await response.json();
                const id = data.id;

                contact.id = id;
                this.contacts.push(contact);
                this.toggleAddContactForm();
            } catch (error) {
                console.error(error);
            }
        },

        //PUT
        async editContact(id, editedContact) {
            this.openContact = false;
            try {
                const response = await fetch(this.url + `/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(editedContact)
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    console.log(editedContact)
                    this.openMessage(data)
                    
                    

                    // Actualizar el contacto en la lista local
                    const index = this.contacts.findIndex(c => c.id === editedContact.id);
                    if (index !== -1) {
                        this.contacts[index] = editedContact;
                    }
                    this.selectedContact = { ...editedContact }; // Actualizar el contacto seleccionado con los cambios guardados
                } else {
                    console.error('Error al guardar la edición del contacto');
                }
            } catch (error) {
                console.error(error);
                this.openMessage(error)
                this.messageError = true
            }
        },

        //DELETE
        async deleteContact(id, editedContact) {
            try {
                console.log(id)
                console.log("antes del fetch")
                const response = await fetch(this.url + `/${id}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    console.log("despues del fetch")
                    this.openContact = false;


                    const index = this.contacts.findIndex(c => c.id === editedContact.id);
                    if (index !== -1) {
                        this.contacts.splice(index, 1);
                    }

                    
                } else {
                    console.error('Error al eliminar el contacto');
                }
            } catch (error) {
                console.error(error);
            }
        },

        toggleAddContactForm() {
            this.showAddContactForm = !this.showAddContactForm;
        },

        openContactDetails(contact) {
            this.editedContact = { ...contact };
            this.selectedContact = contact;
            this.openContact = true
        },

        closeContactDetails() {
            this.openContact = false;
        },

        editarContacto(contacto) {
            this.selectedContact = contacto;
        },

        openMessage(content) {
            this.showMessage = true;
            this.message = content;
            setTimeout(() => {
                this.showMessage = false
                this.messageError = false
            }, 5000);
        }

    },
}

</script>
