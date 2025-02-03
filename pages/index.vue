<template>
    <div>
        <div class="flex flex-col items-center justify-center h-screen">
            <h1 class="text-5xl ">Welcome to Exam App V2</h1>
            <p>This is the home page.</p>
            <button 
            class="p-6 m-6 border-y-zinc-950 bg-amber-950 hover:bg-amber-800 text-white" 
            type="button" 
            @click="navigateTo('/basicMode')">Tıkla</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HomePage',
    data() {
        return {
            message: 'Hello, welcome to the Exam App V2!'
        };
    }
};
</script>

