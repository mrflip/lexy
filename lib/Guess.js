import DictSet from './DictSet'

class Guess {
  constructor(wd, bee) {
    this.bee    = bee
    this.word   = wd.toLowerCase()
    this.isPan  = bee.isPan(this.word)
    this.len    = this.word.length
    this.valid  = DictSet.has(this.word)
    this.score  = this.getScore()
  }

  getScore() {
    if (this.nogo)      return 0
    if (this.len === 4) return 1
    return this.len + (this.isPan ? 7 : 0)
  }

  get nogo() {
    return ((!this.valid) || (!this.hasMain) || (this.len < 4))
  }


  get hasMain() {
    return this.word.includes(this.bee.mainLetter)
  }

  get color() {
    if (!this.valid) return '#cceecc'
    if (this.isPan)   return '#ddddff'
    return '#cceecc'
  }
}

export default Guess
