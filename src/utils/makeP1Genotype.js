import Genotype from "./Genotype";

export default function makeP1Genotype(mutations, male) {
  let genotype = new Genotype(male)

  for (var mutation of mutations) {
    const mutationChromosome = mutation.chromosome;
    const chromosomeToPush = genotype[mutationChromosome]
    chromosomeToPush.a[mutation.name] = mutation;
    if (!mutation.lethal && !(male && mutationChromosome === 'X')) {
      chromosomeToPush.b[mutation.name] = mutation;
    }
  }
  return genotype;
}