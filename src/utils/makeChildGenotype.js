import chooseRandom from '../utils/choose';
import Genotype from './Genotype';

export default function makeChildGenotype(femaleGenotype, maleGenotype) {
  let genotype = new Genotype();
  for (var j of [1, 2, 3, "X"]) {
    genotype[j]["a"] = chooseRandom(femaleGenotype[j])
    genotype[j]["b"] = chooseRandom(maleGenotype[j])
  }
  return genotype;
}