import React, { useState } from 'react';

export default function PhenotypeTable({ trait, phenotypes, F1Male, F1Female, setF1Male, setF1Female }) {
  function countPhenotypes(wantTrait, wantFemale) {
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

  const getClassName = (boldStatus) => {
    if (boldStatus) {
      return "text-button bold";
    } else {
      return "text-button"
    }
  }

  return (
    <table className="table-bordered table-overrides">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">{'male'}</th>
          <th scope="col">{'female'}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">{'wild type'}</th>
          <td>
            <button className={getClassName((F1Male === 'wild type'))} onClick={setF1Male('wild type')}>
              {countPhenotypes(false, false)}
            </button>
          </td>
          <td>
          <button className={getClassName((F1Female === 'wild type'))} onClick={setF1Female('wild type')}>
              {countPhenotypes(false, true)}
            </button>
          </td>
        </tr>
        {trait && (<tr>
          <th scope="row">{trait}</th>
          <td>
          <button className={getClassName((F1Male === trait))} onClick={setF1Male(trait)}>
              {countPhenotypes(true, false)}
            </button>
          </td>
          <td>
          <button className={getClassName((F1Female === trait))} onClick={setF1Female(trait)}>
              {countPhenotypes(true, true)}
            </button>
          </td>
        </tr>)}
      </tbody>
    </table>
  )
}