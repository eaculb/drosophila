export default function countPhenotypes(trait, phenotypes, wantTrait, wantFemale) {
  let count = 0;
  for (var phenotype of phenotypes) {
    const alive = phenotype.alive;
    const matchesSex = ((wantFemale && phenotype['female']) || (!wantFemale && !phenotype['female']))
    const matchesTrait = (trait === null) || (phenotype[trait] === wantTrait)
    if (alive && matchesSex && matchesTrait) {
      count++;
    }
  }
  return count;
}