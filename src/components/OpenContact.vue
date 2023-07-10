<script setup>
    import { library } from '@fortawesome/fontawesome-svg-core'
    import { faPhone, faEnvelope, faUser, faLocationDot, faIdBadge, faCakeCandles, faXmark } from '@fortawesome/free-solid-svg-icons'
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

    import "../styles/openContact.css"
    library.add(faPhone, faEnvelope, faUser, faLocationDot, faIdBadge, faCakeCandles, faXmark)
  
  defineProps({
    selectedContact : Object,
    editedContact : Object
  });

</script>

<template>
    <section class="contact-details-container" >
        <div class="contact-details" >
                <span class="close-contact" @click="closeContact"><font-awesome-icon :icon="['fas', 'xmark']" /></span>
            <div class="contact-upper">
                <div class="img-container">
                    <img :src="selectedContact.img" :alt="selectedContact.name">
                </div>
                <h4 class="contact-details-name">{{ selectedContact.name }}</h4>
                <div class="contact-btns-container">
                    <button class="contact-button edit-btn" @click="openEditForm" v-show="contactDetails">Editar</button>
                    <button class="contact-button delete-btn" @click="openDeleteForm"  v-show="contactDetails">Eliminar</button>
                </div>
            </div>
            <ul class="contact-info" v-show="contactDetails" >
                
                <li>
                    <font-awesome-icon  class="icon" :icon="['fas', 'id-badge']" />
                    <p>{{ selectedContact.id }}</p>
                </li> 
                <li>
                    <font-awesome-icon  class="icon" :icon="['fas', 'phone']" />
                    <p>{{ selectedContact.phone }}</p>
                </li>
                <li>
                    <font-awesome-icon  class="icon" :icon="['fas', 'envelope']" />
                    <p>{{ selectedContact.email }}</p>
                </li>
                <li>
                    <font-awesome-icon  class="icon" :icon="['fas', 'cake-candles']" />
                    <p>{{ selectedContact.birthday }}</p>
                </li>
                
                <li>
                    <font-awesome-icon  class="icon" :icon="['fas', 'user']" />
                    <p>{{ selectedContact.nickname }}</p>
                </li>              
                <li>
                    <font-awesome-icon  class="icon" :icon="['fas', 'location-dot']" />
                    <p>{{ selectedContact.adress }}</p>
                </li>
            </ul>

            <form action="" v-show="editForm" class="edit-form">
                <input class="edit-contact-input input-id" v-model="editedContact.id" name="id" id="id" type="number" readonly>
                <input class="edit-contact-input" v-model="editedContact.name" name="name" id="name" type="text" placeholder="Nombre y apellido" autocomplete="name" required>
                <input class="edit-contact-input" v-model="editedContact.phone" name="phone" id="phone" type="tel" placeholder="01123455678" autocomplete="tel" required>
                <input class="edit-contact-input" v-model="editedContact.email" name="email" id="email" type="email" placeholder="Correo electrónico" autocomplete="email">
                <input class="edit-contact-input" v-model="editedContact.birthday" name="birthday" id="birthday" type="date" autocomplete="bday-day">
                <input class="edit-contact-input" v-model="editedContact.nickname" name="nickname" id="nickname" type="text" placeholder="Apodo">
                <input class="edit-contact-input" v-model="editedContact.adress" name="adress" id="adress" type="adress" placeholder="Dirección" autocomplete="address-level1">
                <input class="edit-contact-input" v-model="editedContact.img" name="img" id="img" type="text" placeholder="https://imagen.com">
                <button class="contact-button" type="button" @click="editContact">Guardar</button>
            </form>
        </div>
        <div v-show="deleteForm" class="confirm-delete-container">
            <div class="confirm-delete">
                <div class="delete-title">
                    <h5>¿Estás seguro que deseas eliminar el contacto?</h5>
                </div>
                <div class="delete-btn-container">
                    <button class="contact-button delete-btn" @click="deleteContact">Eliminar</button>
                    <button class="contact-button edit-btn" @click="closeDeleteForm">Cancelar</button>
                </div>
            </div>
        </div>
    </section>
</template>
    

<script>
  export default {
    data() {
        return {
            editForm: false,
            deleteForm: false,
            contactDetails: true
        }
    },
    methods: {
        openEditForm() {
            this.editForm = true
            this.contactDetails= false
        },
        deleteContact() {
            this.deleteForm = false

            this.$emit('deleteContact', this.selectedContact.id, this.editedContact)
        },
        editContact() {
            this.editForm = false
            this.contactDetails = true

            this.$emit('editContact', this.selectedContact.id, this.editedContact)
        },
        closeContact() {
            this.editForm = false
            this.contactDetails = true

            this.$emit('closeContact')
        },
        openDeleteForm() {
            this.deleteForm = true
        },
        closeDeleteForm() {
            this.deleteForm = false
        }
    }
  }
</script>