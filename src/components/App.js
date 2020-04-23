import '../index.css';
import '../App.css';

import React, { useState, useEffect } from 'react';
import { union, random } from 'lodash';

import phenotypeFromGenotype from '../utils/phenotypeFromGenotype';
import makeChildGenotype from '../utils/makeChildGenotype';
import { traitDictionary } from '../traitDictionaryByName'


import Selector from './Selector'
import PhenotypeRow from './PhenotypeRow'
import F1Table from './F1Table'
import F2Table from './F2Table'

import { Button } from 'react-bootstrap'
import isMale from '../utils/isMale';
import isAlive from '../utils/isAlive';
import makeP1Genotype from '../utils/makeP1Genotype';

const GENERATION_SIZE = 1000;
const NUM_F_GENERATIONS = 2;

function getMutationList(selectedMutationsByCategory) {
  let result = []
  for (var mutation of Object.values(selectedMutationsByCategory)) {
    result.push(traitDictionary[mutation])
  }
  return result;
}

function makeF1Generation(maleMutations, femaleMutations) {
  let maleGenotype = makeP1Genotype(maleMutations, true);
  let femaleGenotype = makeP1Genotype(femaleMutations, false);

  var genotypes = [];
  var phenotypes = [];

  for (var i = 0; i < GENERATION_SIZE; i++) {
    let childGenotype = makeChildGenotype(femaleGenotype, maleGenotype)
    genotypes.push(childGenotype);
    phenotypes.push(phenotypeFromGenotype(childGenotype));
  }
  return { genotypes, phenotypes }
}


function makeCross(parentGenotypes, F1Female, F1Male) {
  let livingParents = parentGenotypes.filter(g => isAlive(g));
  const maleGenotypes = livingParents.filter(genotype => {
    if (!isMale(genotype)) {
      return false
    };
    let phenotype = phenotypeFromGenotype(genotype);
    if (F1Male === 'wild type') {
      return (Object.keys(phenotype) === 'alive', 'female')
    } else {
      return (!!phenotype[F1Male])
    }
  });
  const femaleGenotypes = livingParents.filter(genotype => {
    if (isMale(genotype)) {
      return false
    };
    let phenotype = phenotypeFromGenotype(genotype);
    if (F1Female === 'wild type') {
      return (Object.keys(phenotype) === 'alive', 'female')
    } else {
      return (!!phenotype[F1Female])
    } 
  });

  var genotypes = [];
  var phenotypes = [];

  for (var i = 0; i < GENERATION_SIZE; i++) {
    let maleGenotype = maleGenotypes[random(maleGenotypes.length - 1)];
    let femaleGenotype = femaleGenotypes[random(femaleGenotypes.length - 1)];
    let childGenotype = makeChildGenotype(femaleGenotype, maleGenotype);
    genotypes.push(childGenotype);
    phenotypes.push(phenotypeFromGenotype(childGenotype));
  }
  return { genotypes, phenotypes }
}

export default function App() {

  const [mutationValuesMale, setMutationValuesMale] = useState({});
  const [mutationValuesFemale, setMutationValuesFemale] = useState({});

  const [allGenotypes, setAllGenotypes] = useState([]);
  const [allPhenotypes, setAllPhenotypes] = useState([]);
  const [maleSubmitted, setMaleSubmitted] = useState(false);
  const [femaleSubmitted, setFemaleSubmitted] = useState(false);

  const [F1Male, setF1Male] = useState('wild type');
  const [F1Female, setF1Female] = useState('wild type');

  const [traitOptions, setTraitOptions] = useState([]);

  useEffect(() => {
    setTraitOptions(union(Object.values(mutationValuesMale), Object.values(mutationValuesFemale)));
  }, [mutationValuesMale, mutationValuesFemale]);

  const reset = () => {
    setMutationValuesMale({});
    setMutationValuesFemale({});
    setAllGenotypes([]);
    setAllPhenotypes([]);
    setMaleSubmitted(false);
    setFemaleSubmitted(false);
  }

  const makeFirstGeneration = (mutationValuesMale, mutationValuesFemale) => {
    const maleMutations = getMutationList(mutationValuesMale)
    const femaleMutations = getMutationList(mutationValuesFemale)
    const { genotypes, phenotypes } = makeF1Generation(maleMutations, femaleMutations);
    setAllGenotypes([...allGenotypes, genotypes]);
    setAllPhenotypes([...allPhenotypes, phenotypes]);
  }

  const makeGeneration = () => {
    let currentGenotypes = allGenotypes[allGenotypes.length - 1];
    const { genotypes, phenotypes } = makeCross(currentGenotypes, F1Female, F1Male);
    setAllGenotypes([...allGenotypes, genotypes]);
    setAllPhenotypes([...allPhenotypes, phenotypes]);
  }

  return (
    <div className="app">
      <div className="left p-1 border-right">
        <div className="selector-container">
          <Selector
            title="Male"
            mutationList={mutationValuesMale}
            setMutationList={setMutationValuesMale}
            submitted={maleSubmitted}
            setSubmitted={setMaleSubmitted}
          />
          <Selector
            title="Female"
            mutationList={mutationValuesFemale}
            setMutationList={setMutationValuesFemale}
            submitted={femaleSubmitted}
            setSubmitted={setFemaleSubmitted}
          />
        </div>
        {(allPhenotypes.length === 0) &&
          (femaleSubmitted && maleSubmitted) && (
            <Button
              className="firstButton"
              onClick={() => makeFirstGeneration(mutationValuesMale, mutationValuesFemale)}
            >
              Make F1 Generation
            </Button>)
        }
        {(allPhenotypes.length > 0 && allPhenotypes.length < NUM_F_GENERATIONS) && (
          <Button
            className="firstButton"
            onClick={makeGeneration}
          >
            {`Make F${allPhenotypes.length + 1} Generation`}
          </Button>
        )}
        {(allPhenotypes.length >= NUM_F_GENERATIONS) && (
          <Button
            className="firstButton"
            variant='danger'
            onClick={reset}
          >
            Reset
          </Button>
        )}
      </div>
      <div className="results">
        {(allPhenotypes.length >= 1) && (
          <PhenotypeRow
            Component={F1Table}
            index={0}
            phenotypes={allPhenotypes[0]}
            options={traitOptions}
            F1Male={F1Male}
            F1Female={F1Female}
            setF1Male={setF1Male}
            setF1Female={setF1Female}
          />
        )}
        {(allPhenotypes.length >= 2) && (
          <PhenotypeRow
            Component={F2Table}
            index={1}
            phenotypes={allPhenotypes[1]}
            options={traitOptions}
          />
        )}
      </div>
    </div>
  );
}
