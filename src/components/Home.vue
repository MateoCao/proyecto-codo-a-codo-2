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
            message: '',
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

                if (response.ok) {
                    const data = await response.json();
                    this.contacts = data;
                } else {
                    console.log('Error al cargar los contactos desde la base de datos.')
                    this.openMessage('Error al cargar los contactos desde la base de datos. Por favor, recargue la página.')
                    this.messageError = true
                }        
            } catch (error) {
                console.log(error)
                this.openMessage('Error al cargar los contactos desde la base de datos. Por favor, recargue la página.')
                this.messageError = true
            }
        },

        //POST
        async addContact(contact) {
            try {
                const response = await fetch(this.url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json', 
                    },
                    body: JSON.stringify(contact), 
                });

                if (response.ok) {
                    const data = await response.json();
                    this.openMessage('Contacto añadido exitosamente')
                    const id = data.id;

                    contact.id = id;
                    this.contacts.push(contact);
                    this.toggleAddContactForm();
                } else {
                    console.error('Error al añadir el contacto');
                    this.openMessage('Error añadir el contacto. Por favor, intentelo nuevamente.')
                    this.messageError = true
                }         
            } catch (error) {
                console.log(error)
                this.openMessage('Error añadir el contacto. Por favor, intentelo nuevamente.')
                this.messageError = true
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
                    this.openMessage(data)

                    // Actualizar el contacto en la lista local
                    const index = this.contacts.findIndex(c => c.id === editedContact.id);
                    if (index !== -1) {
                        this.contacts[index] = editedContact;
                    }
                    this.selectedContact = { ...editedContact }; // Actualizar el contacto seleccionado con los cambios guardados
                } else {
                    console.error('Error al guardar la edición del contacto');
                    this.openMessage('Error al guardar la edición del contacto. Por favor, intentelo nuevamente.')
                    this.messageError = true
                }
            } catch (error) {
                console.log(error)
                this.openMessage('Error al guardar la edición del contacto. Por favor, intentelo nuevamente.')
                this.messageError = true
            }
        },

        //DELETE
        async deleteContact(id, editedContact) {
            try {
                const response = await fetch(this.url + `/${id}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    const data = await response.json();
                    this.openMessage(data)
                    this.openContact = false;


                    const index = this.contacts.findIndex(c => c.id === editedContact.id);
                    if (index !== -1) {
                        this.contacts.splice(index, 1);
                    }

                    
                } else {
                    console.error('Error al eliminar el contacto');
                    this.openMessage('Error al eliminar contacto. Por favor, intentelo nuevamente.')
                    this.messageError = true
                }
            } catch (error) {
                console.log(error)
                this.openMessage('Error al eliminar contacto. Por favor, intentelo nuevamente.')
                this.messageError = true
            }
        },

        // Lógica para manejo de componentes

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
            }, 4000);
        }

    },
}

</script>
