import React from 'react';

export default function PhenotypeTable({ trait1, trait2, phenotypes }) {
  function countPhenotypes(trait1, wantTrait1, trait2, wantTrait2) {
    let count = 0;
    for (var phenotype of phenotypes) {
      if (phenotype.alive && phenotype[trait1] === wantTrait1 && phenotype[trait2] === wantTrait2) {
        count++;
      }
    }
    return count;
  }

  return (
    <table className="table-bordered table-overrides">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">{trait1 === 'female' ? 'male' : 'wild type'}</th>
          <th scope="col">{trait1 === 'female' ? 'female' : trait1}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">{trait2 === 'female' ? 'male' : 'wild type'}</th>
          <td>{countPhenotypes(trait1, false, trait2, false)}</td>
          <td>{countPhenotypes(trait1, true, trait2, false)}</td>
        </tr>
        <tr>
          <th scope="row">{trait2 === 'female' ? 'female' : trait2}</th>
          <td>{countPhenotypes(trait1, false, trait2, true)}</td>
          <td>{countPhenotypes(trait1, true, trait2, true)}</td>
        </tr>
      </tbody>
    </table>
  )
}