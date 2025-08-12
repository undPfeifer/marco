<script setup lang="ts">
import { NuxtPage } from '#components';


import { onMounted } from 'vue';




</script>


<template>
  

      <NuxtPage />
      <AppNav />


</template>

<style>

a, button {
  -webkit-tap-highlight-color: transparent;
  tap-highlight-color: transparent;
  -webkit-user-select: none; /* optional: prevent text selection on tap */
  user-select: none;
}




* {
  box-sizing: border-box;
  margin: 0px;
}

html {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
}

html::-webkit-scrollbar {
  display: none; /* Chrome, Safari */
}



.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s linear, opacity 0.35s ease ;
  will-change: transform, opacity;
}

.slide-enter-from {
  transform: translateX(100%);
  opacity: 1;
}

.slide-enter-to {
  transform: translateX(0%);
  opacity: 1;
}

.slide-leave-from {
  transform: translateX(0%);
  opacity: 1;
}

.slide-leave-to {
  transform: translateX(-110%);
  opacity: 0.8;
}








.floating-logo {
  position: fixed;
  width: 80px; /* adjust size */
  height: 80px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  cursor: grab;
  user-select: none;
}
.floating-logo:active {
  cursor: grabbing;
}


html, body {
  cursor: url('public/ueli-cursor.png') 16 16, auto;
  padding: 0px;
}

a {
  text-decoration: none;
  color: black;
}
  * {
    font-family: 'Times New Roman', Times, serif;
    font-size: 16px;

  }

  h1 {
font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;    

    font-size:50px;
    line-height: 0.85;
    letter-spacing: -1px;
    max-width: 16ch;
    
  }
</style>

