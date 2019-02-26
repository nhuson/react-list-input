function* idMaker () {
  let index = 1
  while (true) yield index++
}

const gen = idMaker()

const genKey = () =>
  gen.next().value

export default genKey

