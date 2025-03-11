<template>
    <div>
        <Navbar/>
        <NuxtPage />
        <Footer/> 
        <Analytics/>
    </div>
</template>

<script>
import Navbar from '~/components/Navbar.vue';
import Footer from '~/components/Footer.vue';
import { Analytics } from '@vercel/analytics/nuxt'
export default {
    components: {
        Navbar,
        Footer
    },
    name: 'DefaultLayout'
}
</script>

