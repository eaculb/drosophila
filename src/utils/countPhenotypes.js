import match from './match';

export default function countPhenotypes(wantedPhenotype, phenotypes) {
  let count = 0;
  for (var phenotype of phenotypes) {
    const alive = phenotype.alive;
    let filteredPhenotype = Object.keys(phenotype).filter(key => (key !== 'alive' && phenotype[key]))
    const matchesPhenotype = match(filteredPhenotype, wantedPhenotype);
    if (alive && matchesPhenotype) {
      count++;
    }
  }
  return count;
}