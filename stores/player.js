import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePlayerStore = defineStore('player', () => {
  const currentTrack = ref(null) // active track object
  const isPlaying = ref(false)
  const audio = ref(null) // Audio instance

  function playTrack(track) {
    if (!audio.value) {
      audio.value = new Audio()
    }

    if (currentTrack.value?.name !== track.name) {
      currentTrack.value = track
      audio.value.src = track.url
      audio.value.play()
      isPlaying.value = true
    } else {
      togglePlay()
    }
  }

  function togglePlay() {
    if (!audio.value) return
    if (isPlaying.value) {
      audio.value.pause()
      isPlaying.value = false
    } else {
      audio.value.play()
      isPlaying.value = true
    }
  }

  function stop() {
    if (!audio.value) return
    audio.value.pause()
    audio.value.currentTime = 0
    isPlaying.value = false
    currentTrack.value = null
  }

  return { currentTrack, isPlaying, playTrack, togglePlay, stop }
})
