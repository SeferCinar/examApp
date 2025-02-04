<template>
    <footer class="w-full bg-gray-800 text-gray-300 py-4 px-6 items-center justify-center">
        <div class="container mx-auto flex flex-col justify-center sm:flex-row justify-center items-center gap-2">
            <p class="text-sm">&copy; {{ new Date().getFullYear() }} Sefer Çınar</p>
            <a href="https://sefercinar.com" 
               target="_blank" 
               rel="noopener noreferrer"
               class="text-cyan-400 hover:text-cyan-300 transition-colors text-sm">
                sefercinar.com
            </a>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'Footer'
}
</script>

