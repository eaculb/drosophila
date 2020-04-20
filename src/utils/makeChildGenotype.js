import chooseRandom from '../utils/choose';

export default function makeChildGenotype(femaleGenotype, maleGenotype) {
  let chromosomes = {};
  for (var j of [1, 2, 3, "X"]) {
    chromosomes[j] = {};
    chromosomes[j]["a"] = chooseRandom(femaleGenotype[j])
    chromosomes[j]["b"] = chooseRandom(maleGenotype[j])
  }
  return chromosomes;
}