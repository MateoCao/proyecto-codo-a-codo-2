<script setup>
    import "../styles/contactsDisplay.css"

    defineProps({
        contacts: Array
    })

</script>

<template>
    <div class="contacts-interface">
        <ul class="contacts-container">
            <li class="contact" v-for="contact in contacts" @click="$emit('openContactDetails', contact)">
                <h3 class="contact-name">{{ contact.name }}</h3>
                <p class="contact-phone">{{ contact.phone }}</p>
                <p class="contact-email">{{ contact.email }}</p>
            </li>
        </ul>      
    </div>
</template>