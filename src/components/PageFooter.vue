<script setup>
    import { library } from '@fortawesome/fontawesome-svg-core'
    import { faFacebook, faInstagram, faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons'
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

    import "../styles/pageFooter.css"
    library.add(faFacebook, faInstagram, faGithub, faTwitter)
</script>

<template>
    <footer>
        <h4>Codo a codo - TPO 2</h4>
        <div class="icons-container">
            <a href="https://www.facebook.com/" target="_blank">
                <font-awesome-icon class="icon" :icon="['fab', 'facebook']" />
            </a>
            <a href="https://www.instagram.com/" target="_blank">
                <font-awesome-icon class="icon" :icon="['fab', 'instagram']" />
            </a>
            <a href="https://twitter.com/home" target="_blank">
                <font-awesome-icon class="icon" :icon="['fab', 'twitter']" />
            </a>
            <a href="https://github.com/MateoCao/proyecto-codo-a-codo-2" target="_blank">
                <font-awesome-icon class="icon" :icon="['fab', 'github']" />
            </a>
        </div>
    </footer>
</template>