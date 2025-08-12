<script setup lang="ts">
import { NuxtPage } from '#components';
import Playsong from './components/playsong.vue';


import { onMounted } from 'vue';



onMounted(() => {
  const logo = document.querySelector('.floating-logo') as HTMLElement;
  if (!logo) return;

  let posX = 100;
  let posY = 100;
  let velX = 2; // speed in X
  let velY = 2; // speed in Y
  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  const moveLogo = () => {
    if (!isDragging) {
      const screenW = window.innerWidth - logo.offsetWidth;
      const screenH = window.innerHeight - logo.offsetHeight;

      posX += velX;
      posY += velY;

      // bounce off edges
      if (posX <= 0 || posX >= screenW) velX *= -1;
      if (posY <= 0 || posY >= screenH) velY *= -1;

      logo.style.left = `${posX}px`;
      logo.style.top = `${posY}px`;
    }
    requestAnimationFrame(moveLogo);
  };

  // Start moving
  moveLogo();

  // Drag interaction
  logo.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - posX;
    offsetY = e.clientY - posY;
    velX = 0;
    velY = 0;
  });

  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      posX = e.clientX - offsetX;
      posY = e.clientY - offsetY;
      logo.style.left = `${posX}px`;
      logo.style.top = `${posY}px`;
    }
  });

  document.addEventListener('mouseup', (e) => {
    if (isDragging) {
      isDragging = false;
      // Calculate new velocity based on drag movement
      velX = (e.movementX || (Math.random() - 0.5) * 8); // fallback random
      velY = (e.movementY || (Math.random() - 0.5) * 8);
    }
  });

  // Prevent default browser drag behavior
logo.addEventListener('dragstart', (e) => {
  e.preventDefault();
});
});



</script>


<template>
  
  <navbar />

  <GlobalAudioPlayer />

<ueli-counter />


  <div>

    <Transition name="slide" mode="out-in">
      <NuxtPage />

    </Transition>
  </div>
  <img src="/ueli-cursor.png" class="floating-logo" alt="floating logo" />

</template>

<style>

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

