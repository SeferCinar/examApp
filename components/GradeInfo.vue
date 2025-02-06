<template>
    <div class="flex flex-col items-start border  border-gray-600 my-4 py-4 px-3  transition-colors rounded w-full" 
        :class="infoBgColor , infoBgColorHover">
        <div class="font-bold" :class="infoTextColor ">{{ gradeText }}:</div>
        <div class="text-lg font-semibold text-gray-300">{{ gradeValue }}</div>
      </div>
</template>
<script>
export default{
    props:{
        gradeText:{
            type:String,
            required:true,
        },
        gradeValue:{
            type:Number,
            required:true,
        },
        infoTextColor:{
            type:String,
            required:false,
            default:"text-emerald-500",
        },
        infoBgColor:{
            type:String,
            required:false,
            default:" bg-amber-500 dark:bg-sky-800",
        },
        infoBgColorHover:{
            type:String,
            required:false,
            default:"hover:bg-sky-700",
        },
    }
}
</script>