<template>
    <div>
        <Navbar/>
        <NuxtPage />
        <Footer/> 
        <Analytics/>
    </div>
</template>

<script setup>
import Navbar from '~/components/Navbar.vue';
import Footer from '~/components/Footer.vue';
import { Analytics } from '@vercel/analytics/nuxt'

</script>

