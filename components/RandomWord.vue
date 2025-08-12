<template>
    <section>
        <div style="display:flex">
          <h1 v-if="syllableCount<5">{{ randomWord }}</h1> 
          <h1 v-else class="smaller">{{ randomWord }}</h1> 

          <button>☆</button>
      </div>
  
      <!-- syllable controls -->
      <div class="controls">
        <button @click="decrease" :disabled="syllableCount === 1">−</button>
        <span>silbe: {{ syllableCount }}</span>
        <button @click="increase" :disabled="syllableCount === 10">+</button>
      </div>
  
      <!-- new word -->
      <button @click="newWord" class="new-word">♋︎</button>
    </section>
  </template>
  
  <script setup>
 import { ref, computed, onMounted } from 'vue'

const randomWord = ref('lade wörter...')  // loading text
const syllableCount = ref(1)  // start with 1 syllable

const syllableWords = {
  '1': ref([]),
  '2': ref([]),
  '3': ref([]),
  '4': ref([]),
  '5': ref([]),
  '6': ref([]),
  '7': ref([]),
  '8': ref([]),
  '9': ref([]),
  '10': ref([]),
}

async function loadLocalWords(syllCount) {
  try {
    const res = await fetch(`/words/german_${syllCount}_syllable_words.json`)
    if (!res.ok) throw new Error('Failed to load JSON')
    const data = await res.json()
    syllableWords[syllCount].value = data
  } catch (e) {
    console.error(`Error loading syllable ${syllCount} words:`, e)
  }
}

onMounted(async () => {
  const syllableCounts = ['1','2','3', '4','5','6','7','8','9','10']
  for (const count of syllableCounts) {
    await loadLocalWords(count)
  }
  newWord() // pick a random word after loading
})

const currentList = computed(() => {
  return syllableWords[syllableCount.value.toString()]?.value || []
})

function newWord() {
  const list = currentList.value
  if (!list || list.length === 0) {
    randomWord.value = 'ayo da isch nüt'
    return
  }
  const idx = Math.floor(Math.random() * list.length)
  randomWord.value = list[idx]
}

function increase() {
  if (syllableCount.value < 10) syllableCount.value++
  newWord()
}

function decrease() {
  if (syllableCount.value > 1) syllableCount.value--
  newWord()
}

  </script>
  
  <style scoped>

    h1 {
        margin-right: 10px;
    }

    section {
        width: 100%;
    }



    button {
        border: none;
        background-color: black;
        color: white;
        cursor: pointer;
    }
    button:hover {
        opacity: 75;
        background-color: rgb(27, 49, 75);
    }

    .controls {
        padding: 12px 0px;
        display: flex;
        gap: 8px;
    }
    .new-word{
        font-size: 32px;
    }
    .smaller {
        font-size: 32px;
        letter-spacing: -1px;
    }
</style>