import Genotype from "./Genotype";

export default function makeP1Genotype(mutations, female) {
  let genotype = new Genotype(female)

  for (var mutation of mutations) {
    const mutationChromosome = mutation.chromosome;
    const chromosomeToPush = genotype[mutationChromosome]
    chromosomeToPush.a[mutation.name] = mutation;
    if (!mutation.lethal && (female || mutationChromosome !== 'X')) {
      chromosomeToPush.b[mutation.name] = mutation;
    }
  }
  return genotype;
}