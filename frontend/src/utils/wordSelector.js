import wordList from '../assets/wordList.json'

export function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * wordList.length)
    return wordList[randomIndex].trim()
}

console.log(getRandomWord)