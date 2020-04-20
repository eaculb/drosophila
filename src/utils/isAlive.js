import phenotypeFromGenotype from "./phenotypeFromGenotype";

export default function isAlive(genotype) {
  return phenotypeFromGenotype(genotype).alive
}