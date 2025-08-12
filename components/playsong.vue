<template>
    <section>
      <!-- Song List -->
      <div
        v-for="file in files"
        :key="file.name"
        class="audio-player"
        @click="playTrack(file)"
      >
        <h4 class="player--title">{{ file.name }}</h4>
      </div>
    </section>
  
    <!-- Global Player -->
    <div
      v-if="currentTrack"
      class="global-player"
    >
      <h4>{{ currentTrack.name }}</h4>
      <button @click="togglePlay" style="color:white">
        {{ isPlaying ? 'II' : '>' }}
      </button>
  
      <!-- Progress Bar -->
      <div
        class="progress-container"
        @click="seekByClick($event)"
      >
        <div
          class="progress-bar"
          :style="{ width: progressPercentage + '%' }"
        ></div>
        <div
          class="progress-handle"
          :style="{ left: progressPercentage + '%' }"
          @mousedown="startDrag($event)"
        ></div>
      </div>
  
      <div class="time-display">
        {{ formatTime(currentTime) }} / {{ formatTime(duration) }}
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue'
  import { createClient } from '@supabase/supabase-js'
  
  // Supabase client
  const supabaseUrl = "https://nalnmysgfilnxectuafq.supabase.co"
  const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5hbG5teXNnZmlsbnhlY3R1YWZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5NDAxMDIsImV4cCI6MjA2NTUxNjEwMn0.BWjUc8A9wnaoOt7mQKvCycN5kH9tneS07p4tMcxtMGQ"
  const supabase = createClient(supabaseUrl, supabaseAnonKey)
  
  // State
  const files = ref([])
  const currentTrack = ref(null)
  let audio // ⚠️ Declare without initializing yet
  const isPlaying = ref(false)
  const currentTime = ref(0)
  const duration = ref(0)
  const isDragging = ref(false)
  
  const progressPercentage = computed(() => {
    return duration.value ? (currentTime.value / duration.value) * 100 : 0
  })
  
  async function fetchFiles() {
    const { data, error } = await supabase.storage.from('marco').list('')
    if (error) {
      console.error('Error listing files:', error)
    } else {
      files.value = data
    }
  }
  
  function getFileUrl(fileName) {
    return `${supabaseUrl}/storage/v1/object/public/marco/${encodeURIComponent(fileName)}`
  }
  
  function playTrack(file) {
    if (!audio) return
    if (currentTrack.value?.name !== file.name) {
      currentTrack.value = file
      audio.src = getFileUrl(file.name)
      audio.play()
      isPlaying.value = true
    } else {
      togglePlay()
    }
  }
  
  function togglePlay() {
    if (!audio) return
    if (isPlaying.value) {
      audio.pause()
      isPlaying.value = false
    } else {
      audio.play()
      isPlaying.value = true
    }
  }
  
  function seekByClick(event) {
  if (!audio) return
  const container = event.currentTarget
  const rect = container.getBoundingClientRect()
  const clickX = event.clientX - rect.left
  const percentage = clickX / rect.width
  const newTime = duration.value * percentage
  audio.currentTime = newTime
  // ✅ REMOVE: currentTime.value = newTime
}
  
  function startDrag(event) {
    if (!audio) return
    isDragging.value = true
  
    const onMouseMove = (e) => {
      const container = event.currentTarget.parentElement
      const rect = container.getBoundingClientRect()
      let offsetX = e.clientX - rect.left
      offsetX = Math.max(0, Math.min(offsetX, rect.width))
      const percentage = offsetX / rect.width
      const newTime = duration.value * percentage
      currentTime.value = newTime
    }
  
    const onMouseUp = () => {
      audio.currentTime = currentTime.value
      isDragging.value = false
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }
  
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }
  
  function formatTime(seconds = 0) {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }
  
  onMounted(() => {
    fetchFiles()
  
    audio = new Audio() // ✅ Initialize in browser only
  
    audio.addEventListener('timeupdate', () => {
      if (!isDragging.value) {
        currentTime.value = audio.currentTime
      }
    })
  
    audio.addEventListener('loadedmetadata', () => {
      duration.value = audio.duration
    })
  
    audio.addEventListener('ended', () => {
      isPlaying.value = false
      currentTime.value = 0
    })
  })
  </script>
  
  <style scoped>
  * {
    margin: 0px;
  }
    .global-player{
        position: fixed;
        bottom: 0px;
        left: 0px;
        z-index: 99999999;

        padding: 10px 10px;
        width: 100%;
        
        height: auto;
        margin-top: 100px;
        background-color: black;
    }



h4 {
    font-size: 24px;
    color: white;
    margin-bottom: 2px;
    margin-top: 0px;
}


.audio-player {
margin-bottom: 4px;

padding: 0px;
border-radius: 0px;
width: 90%;
max-width: 400px;
color: white;

}

button {
all: unset;
cursor: pointer;
font-size: 20px;
background-color: #002ccc;
padding: 0px 12px;
}

.progress-container {
width: 100%;
height: 12px;
background: #424242;
margin: 2px 0;
position: relative;
cursor: pointer;
}

.progress-bar {
height: 100%;
background: blue;
}

.progress-handle {
width: 16px;
height: 16px;
background: #000000;
position: absolute;
top: 50%;
transform: translate(-50%, -50%);
cursor: grab;
transition: background 0.2s ease;
}

.progress-handle:active {
background: #cc5200;
cursor: grabbing;
}

.time-display {
font-size: 0.9rem;
color: #b4b4c2;
}

.player--title {
    color: black;
}

    </style>
  