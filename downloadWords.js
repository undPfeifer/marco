import fs from 'fs'

const syllableCounts = ['4']

// Sleep helper
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function fetchAllCategoryWords(category) {
  let words = []
  let cmcontinue = null

  while (true) {
    const url = new URL('https://en.wiktionary.org/w/api.php')
    url.searchParams.set('action', 'query')
    url.searchParams.set('list', 'categorymembers')
    url.searchParams.set('cmtitle', `Category:${category}`)
    url.searchParams.set('cmlimit', '500')
    url.searchParams.set('format', 'json')
    if (cmcontinue) url.searchParams.set('cmcontinue', cmcontinue)

    let response, data

    try {
      response = await fetch(url)
      if (response.status === 429) {
        console.warn(`Rate limited by API, waiting 5 seconds...`)
        await sleep(5000)
        continue // retry same request
      }
      if (!response.ok) throw new Error(`HTTP error ${response.status}`)
      data = await response.json()
    } catch (e) {
      console.error('Fetch error:', e)
      throw e
    }

    const newWords = data.query.categorymembers.map(e => e.title)
    words.push(...newWords)
    console.log(`Fetched ${words.length} words from ${category}...`)

    if (!data.continue?.cmcontinue) break

    cmcontinue = data.continue.cmcontinue

    // Be nice, delay between requests to avoid rate-limits
    await sleep(1500)
  }

  return words
}

async function main() {
  for (const count of syllableCounts) {
    const category = `German_${count}-syllable_words`
    console.log(`Downloading category: ${category}`)

    try {
      const words = await fetchAllCategoryWords(category)
      const filename = `german_${count}_syllable_words.json`
      fs.writeFileSync(filename, JSON.stringify(words, null, 2), 'utf-8')
      console.log(`Saved ${words.length} words to ${filename}`)
    } catch (e) {
      console.error(`Failed for category ${category}:`, e)
    }
  }
}

main()
