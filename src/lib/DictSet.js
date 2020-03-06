import _              from 'lodash'
import Dict           from '../../data/wl_us.json'

const DictSet = new Set(Dict)

const Searches = {}

DictSet.allMatches = (letters) => {
  const lowers = letters.toLowerCase()
  if (Searches[letters]) { return Searches[letters] }
  const re = new RegExp(`^(?=.*${lowers[0]})[${lowers}]{4,}$`)
  console.log(re, re.test('laboratory'))
  const words    = Dict.filter((wd) => re.test(wd))
  const grouped = _.groupBy(words, 'length')
  const matches = { words, grouped }
  Searches[letters] = matches
  // console.log(Searches)
  return matches
}

export default DictSet
