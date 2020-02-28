import Guess from './Guess'

const VOWELS = new Set(['a', 'e', 'i', 'o', 'u'])

class Bee {
  constructor(ltrs) {
    this.letters   = Bee.normalize(ltrs)
    this.mainLtr   = this.letters[0]  //eslint-disable-line
    this.pangramRe = Bee.makePangramRe(this.letters)
    this.guesses   = []
  }

  static normalize(ltrs) {
    const lonly = ltrs.replace(/[^A-Za-z]/g,'')
    const larr  = lonly.toLowerCase().split('')
    const luniq = [...new Set(larr)].slice(0,7)
    const firl  = luniq.shift()
    luniq.sort((aa, bb) => {
      if (VOWELS.has(aa) && !VOWELS.has(bb)) return -1
      if (VOWELS.has(bb) && !VOWELS.has(aa)) return 1
      return ((aa > bb) ? 1 : -1)
    })
    return [firl, ...luniq].join('')
  }

  get dispLtrs() {
    const la = this.letters.toUpperCase().split('')
    return [la.shift(), '/', ...la].join(' ')
  }

  get larry() {
    return this.letters.split('');
  }

  isPan(word) {
    return this.pangramRe.test(word)
  }

  static makePangramRe(letters) {
    return new RegExp(letters.split('').map((ltr) => `(?=.*${ltr})`).join(''))
  }

  hasWord = (word) => {
    this.guesses.some((guess) => (guess.word === word))
  }

  addGuess(word) {
    if (this.hasWord(word)) return;
    const guess = new Guess(word, this)
    this.guesses = this.guesses.concat(guess)
    this.sortGuesses()
  }

  delGuess(wd) {
    this.guesses = this.guesses.filter((guess) => guess.word !== wd)
  }

  sortGuesses() {
    this.guesses.sort((aa, bb) => (aa.word < bb.word ? -1 : 1))
  }

  wordHist() {
    return this.guesses.reduce((hist, guess) => {
      if (guess.valid) {
        hist[guess.len] = 1 + (hist[guess.len] || 0)
      }
      return hist
    }, {})
  }

  totScore() {
    return this.guesses.reduce((tot, guess) => (tot + guess.score), 0)
  }

}

export default Bee
