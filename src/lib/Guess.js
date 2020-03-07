import _ from 'lodash'
import { Dicts } from './Dicts'

class Guess {
  constructor(wd, bee) {
    this.word    = wd.toLowerCase()
    this.len     = this.word.length
    this.isPan   = bee.isPan(this.word)
    this.scr     = Dicts.scr.has(this.word)
    this.nyt     = Dicts.nyt.has(this.word)
    this.valid   = (this.nyt || this.scr)
    this.hasMain = this.word.includes(bee.mainLetter)
    this.score   = this.getScore(this.word)
  }

  getScore() {
    if (this.nogo)      return 0
    if (!this.nyt)     return 0
    if (this.len === 4) return 1
    return this.len + (this.isPan ? 7 : 0)
  }

  get nogo() {
    return ((!this.valid) || (!this.hasMain) || (this.len < 4))
  }

  get color() {
    if (!this.valid)  return '#eecccc'
    if (this.isPan)   return '#ddddff'
    if (this.nyt)     return '#cceecc'
    return 'dddddd'
  }

}
  export default Guess
