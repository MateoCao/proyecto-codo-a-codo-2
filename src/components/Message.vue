<script setup>
    import '../styles/message.css'

    defineProps({
        message: String,
        messageError: Boolean
    })

</script>

<template>
    <div :class="{'message-container': true, 'message-success' : messageError == false, 'message-error' : messageError == true }">
        <span>
            {{ message }}
        </span>
    </div>
</template>