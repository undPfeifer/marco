<template>
    <section>
        <div style="display:flex">
          <h1>{{ randomWord }}</h1> 
          <button>☆</button>
      </div>
  
      <!-- syllable controls -->
      <div class="controls">
        <button @click="decrease" :disabled="syllableCount === 1">−</button>
        <span>silbe: {{ syllableCount }}</span>
        <button @click="increase" :disabled="syllableCount === 4">+</button>
      </div>
  
      <!-- new word -->
      <button @click="newWord" class="new-word">♋︎</button>
    </section>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  
  const randomWord = ref('lade wörter...')  // loading text
  const syllableCount = ref(3)  // start with 3 syllables
  
  // placeholders for arrays, only 3 syllables filled dynamically
  const oneSyllable = ["Haus", "Tier", "Mund"] // static for now
  const twoSyllables = ["Auto", "Fenster", "Sonne"] // static for now
  const threeSyllables = ref([])
  const fourSyllables = ["Schokolade", "Offensichtlich", "Universität"] // static for now
  
  // Fetch function for a category
  async function fetchCategoryWords(category) {
    let words = []
    let cmcontinue = null
  
    do {
      const url = new URL('https://en.wiktionary.org/w/api.php')
      url.searchParams.set('action', 'query')
      url.searchParams.set('list', 'categorymembers')
      url.searchParams.set('cmtitle', `Category:${category}`)
      url.searchParams.set('cmlimit', 'max')
      url.searchParams.set('format', 'json')
      url.searchParams.set('origin', '*')
      if (cmcontinue) url.searchParams.set('cmcontinue', cmcontinue)
  
      const response = await fetch(url)
      const data = await response.json()
  
      words.push(...data.query.categorymembers.map(entry => entry.title))
  
      cmcontinue = data.continue?.cmcontinue || null
    } while (cmcontinue)
  
    return words
  }
  
  onMounted(async () => {
    threeSyllables.value = await fetchCategoryWords('German_3-syllable_words')
    newWord() // pick a random word on load
  })
  
  // computed returns the active list for the current syllable count
  const currentList = computed(() => {
    if (syllableCount.value === 1) return oneSyllable
    if (syllableCount.value === 2) return twoSyllables
    if (syllableCount.value === 3) return threeSyllables.value
  
    return fourSyllables
  })
  
  function newWord() {
    const list = currentList.value
    if (!list || list.length === 0) {
      randomWord.value = '—' // fallback if array is empty
      return
    }
    const idx = Math.floor(Math.random() * list.length)
    randomWord.value = list[idx]
  }
  
  function increase() {
    if (syllableCount.value < 4) syllableCount.value++
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
</style>