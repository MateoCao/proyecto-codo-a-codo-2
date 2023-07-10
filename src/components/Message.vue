<script setup>
    import '../styles/message.css'

    defineProps({
        message: String,
        messageError: Boolean
    })

</script>

<template>
    <div class='message-container' :class="messageError ? 'message-error' : 'message-success'">
        <span>
            {{ message }}
        </span>
    </div>
</template>