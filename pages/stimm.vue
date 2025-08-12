<template>
    <section>
      <div
        v-for="file in files"
        :key="file.name"
        class="audio-player"
        @click="selectTrack(file)"
      >
        <h4>{{ file.name }}</h4>

      </div>
      <NuxtImg src="/_XT41876.webp" width="200"> </NuxtImg>
      <NuxtImg src="/_XT41876.webp" width="500"> </NuxtImg>
      <NuxtImg src="/_XT41876.webp"> </NuxtImg>
    </section>
  </template>
  
<script setup>
        import { ref, onMounted } from 'vue'
        import { createClient } from '@supabase/supabase-js'
        import { usePlayerStore } from '~/stores/player'
        
        const player = usePlayerStore()
        
        const supabaseUrl = "https://nalnmysgfilnxectuafq.supabase.co"
        const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5hbG5teXNnZmlsbnhlY3R1YWZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5NDAxMDIsImV4cCI6MjA2NTUxNjEwMn0.BWjUc8A9wnaoOt7mQKvCycN5kH9tneS07p4tMcxtMGQ"
        const supabase = createClient(supabaseUrl, supabaseAnonKey)
        
        const files = ref([])
        
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
        
        function selectTrack(file) {
            const fileUrl = getFileUrl(file.name)
            player.playTrack({ name: file.name, url: fileUrl })
        }
        
        onMounted(fetchFiles)
</script>
        
<style scoped>
        .audio-player {
            margin-bottom: 4px;
            background: #000;
            color: #ff6600;
            padding: 8px;
            border-radius: 4px;
            cursor: pointer;
        }
        .audio-player:hover {
            background: #111;
        }
</style>
  