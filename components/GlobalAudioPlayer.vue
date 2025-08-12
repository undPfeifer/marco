<template>
    <div
      v-if="player.currentTrack"
      class="global-player"
    >
      <div class="track-info">
        <h4>{{ player.currentTrack.name }}</h4>
        <div class="time-display">
          {{ formatTime(player.currentTime) }} / {{ formatTime(player.duration) }}
        </div>
      </div>
  
      <div class="controls">
        <button @click="player.togglePlay">
          {{ player.isPlaying ? '⏸' : '▶️' }}
        </button>
        <button @click="player.stop">❌</button>
      </div>
  
      <div
        class="progress-container"
        @click="seek($event)"
      >
        <div
          class="progress-bar"
          :style="{ width: progressPercentage + '%' }"
        ></div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  import { usePlayerStore } from '~/stores/player'
  let player
if (process.client) {
  player = usePlayerStore()
}  
  const progressPercentage = computed(() => {
    return player.duration ? (player.currentTime / player.duration) * 100 : 0
  })
  
  function seek(event) {
    const container = event.currentTarget
    const rect = container.getBoundingClientRect()
    const clickX = event.clientX - rect.left
    const percentage = clickX / rect.width
    player.audio.currentTime = player.duration * percentage
  }
  
  function formatTime(seconds = 0) {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }
  </script>
  
  <style scoped>
  .global-player {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;

    z-index: 9999999;
    background: #000;
    color: #fff;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #333;
  }
  
  .track-info {
    display: flex;
    flex-direction: column;
  }
  
  .controls {
    display: flex;
    gap: 10px;
  }
  
  button {
    all: unset;
    cursor: pointer;
    background: #002ccc;
    color: #fff;
    padding: 4px 10px;
    border-radius: 4px;
  }
  
  .progress-container {
    width: 100%;
    height: 6px;
    background: #444;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 5px;
  }
  
  .progress-bar {
    height: 100%;
    background: #fff;
    border-radius: 4px;
  }
  </style>
  