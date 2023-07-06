<script setup>
    import { library } from '@fortawesome/fontawesome-svg-core'
    import { faXmark } from '@fortawesome/free-solid-svg-icons'
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
    import "../styles/addContact.css"

    library.add(faXmark)

</script>

<template>
    <div class="add-contact-shadow">
        <div class="add-contact-container">
            <div @click="$emit('closeContactForm')" class="add-contact-close">
                <font-awesome-icon :icon="['fas', 'xmark']" />
            </div>
            <form ref="contactForm" class="add-contact-form" @submit.prevent="submitForm">
                <label for="name">Nombre</label>
                <input class="add-contact-input" v-model="name" name="name" id="name" type="text" placeholder="Juan Pérez" required autocomplete="name">
                <label for="phone">Teléfono</label>
                <input class="add-contact-input" v-model="phone" name="phone" id="phone" type="tel" placeholder="01123455678" autocomplete="tel">
                <label for="email">Correo electrónico</label>
                <input class="add-contact-input" v-model="email" name="email" id="email" type="email" placeholder="example@gmail.com" autocomplete="email">
                <label for="birthday">Fecha de nacimiento</label>
                <input class="add-contact-input" v-model="birthday" name="birthday" id="birthday" type="date" placeholder="example@gmail.com" autocomplete="bday-day">
                <label for="nickname">Apodo</label>
                <input class="add-contact-input" v-model="nickname" name="nickname" id="nickname" type="adress" placeholder="Juanceto01">
                <label for="adress">Dirección</label>
                <input class="add-contact-input" v-model="adress" name="adress" id="adress" type="text" placeholder="Calle Falsa 123" autocomplete="address-level1">
                <label for="img">Imagen</label>
                <input class="add-contact-input" v-model="img" name="img" id="img" type="text" placeholder="https//:imagen.com">
                <button type="submit" class="add-contact-form-button">Añadir</button>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                name: '',
                phone: null,
                email: '',
                birthday: null,
                nickname: '',
                adress: '',
                img: '',
            }   
        },
        methods: {
            resetForm() {
                this.name = ""
                this.phone = null
                this.email = ""
                this.birthday = null
                this.nickname = "" 
                this.adress = ""
                this.img =  ""
            },
            submitForm() {
            // Validar y procesar los datos del formulario
                const contact = {
                    name: this.name,
                    phone: this.phone,
                    email: this.email,
                    birthday: this.birthday,
                    nickname: this.nickname,
                    adress: this.adress,
                    img: this.img,
                };

                this.resetForm()

                this.$emit('addContact', contact); // Emitir el evento con los datos del contacto
            },
        }
    }
</script>