import { traitDictionary } from '../traitDictionaryByName'

function getUniqueMutations(genotype) {
  let result = new Set()
  for (let chromosomeNumber of [1, 2, 3, "X"]) {
    for (let chromosome of ["a", "b"]) {
      for (let key of Object.keys(genotype[chromosomeNumber][chromosome])) {
        result.add(key);
      }
    }
  }
  return result;
}

export default function phenotypeFromGenotype(genotype) {
  let phenotype = { alive: true }
  phenotype.female = (!!genotype.X.b);
  const uniqueMutationNames = getUniqueMutations(genotype);
  for (var mutationName of uniqueMutationNames) {
    let chromosome = genotype[traitDictionary[mutationName].chromosome]
    let mutationOnA = chromosome.a[mutationName];
    let mutationOnB = chromosome.b[mutationName];
    let mutation = mutationOnA || mutationOnB;
    if (mutation) {
      if (mutation.lethal && mutationOnA && mutationOnB) {
        return { alive: false }
      }
      if (mutation.dominant || (mutationOnA && mutationOnB) || (mutationOnA && !chromosome.b)) {
        phenotype[mutationName] = true;
      } else {
        phenotype[mutationName] = false;
      }
    }
  }
  return phenotype;
}