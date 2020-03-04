import DictSet from './DictSet'

class Guess {
  constructor(wd, bee) {
    this.word    = wd.toLowerCase()
    this.len     = this.word.length
    this.isPan   = bee.isPan(this.word)
    this.valid   = DictSet.has(this.word)
    this.hasMain = this.word.includes(bee.mainLetter)
    this.score   = this.getScore()
  }

  getScore() {
    if (this.nogo)      return 0
    if (this.len === 4) return 1
    return this.len + (this.isPan ? 7 : 0)
  }

  get nogo() {
    return ((!this.valid) || (!this.hasMain) || (this.len < 4))
  }

  get color() {
    if (!this.valid) return '#cceecc'
    if (this.isPan)   return '#ddddff'
    return '#cceecc'
  }

}

export default Guess
