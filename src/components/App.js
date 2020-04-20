import '../index.css';
import '../App.css';

import React, { useState } from 'react';
import { union, random } from 'lodash';

import phenotypeFromGenotype from '../utils/phenotypeFromGenotype';
import makeChildGenotype from '../utils/makeChildGenotype';
import traitDictByCategory from '../utils/traitDictByCategory';
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


function getSelectedMutations(mutationValues) {
  let returnList = [];
  for (var category in mutationValues) {
    var traitName = mutationValues[category];
    if (traitName !== "wild type") {
      returnList.push(traitDictionary[traitName]);
    }
  }
  return returnList;
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


function makeCross(parentGenotypes, uniqueMutationNames) {
  let livingParents = parentGenotypes.filter(g => isAlive(g));
  const maleGenotypes = livingParents.filter(genotype => isMale(genotype));
  const femaleGenotypes = livingParents.filter(genotype => !isMale(genotype));

  var genotypes = [];
  var phenotypes = [];

  for (var i = 0; i < GENERATION_SIZE; i++) {
    let maleGenotype = maleGenotypes[random(maleGenotypes.length - 1)];
    let femaleGenotype = femaleGenotypes[random(femaleGenotypes.length - 1)];
    let childGenotype = makeChildGenotype(femaleGenotype, maleGenotype);
    genotypes.push(childGenotype);
    phenotypes.push(phenotypeFromGenotype(childGenotype, uniqueMutationNames));
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

  const maleMutations = getSelectedMutations(mutationValuesMale);
  const femaleMutations = getSelectedMutations(mutationValuesFemale);

  const uniqueMutationNames = union(femaleMutations.map(mutation => mutation && mutation.name), maleMutations.map(mutation => mutation && mutation.name));

  const reset = () => {
    setMutationValuesMale({});
    setMutationValuesFemale({});
    setAllGenotypes([]);
    setAllPhenotypes([]);
    setMaleSubmitted(false);
    setFemaleSubmitted(false);
  }

  const makeFirstGeneration = () => {
    const { genotypes, phenotypes } = makeF1Generation(maleMutations, femaleMutations, uniqueMutationNames);
    setAllGenotypes([...allGenotypes, genotypes]);
    setAllPhenotypes([...allPhenotypes, phenotypes]);
  }

  const makeGeneration = () => {
    let currentGenotypes = allGenotypes[allGenotypes.length - 1];
    const { genotypes, phenotypes } = makeCross(currentGenotypes, uniqueMutationNames);
    setAllGenotypes([...allGenotypes, genotypes]);
    setAllPhenotypes([...allPhenotypes, phenotypes]);
    debugger;
  }

  return (
    <div className="app">
      <div className="left p-1 border-right">
        <div className="selector-container">
          <Selector
            dict={traitDictByCategory}
            title="Male"
            values={mutationValuesMale}
            setter={setMutationValuesMale}
            selectedMutations={maleMutations}
            submitted={maleSubmitted}
            setSubmitted={setMaleSubmitted}
          />
          <Selector
            dict={traitDictByCategory}
            title="Female"
            values={mutationValuesFemale}
            setter={setMutationValuesFemale}
            selectedMutations={femaleMutations}
            submitted={femaleSubmitted}
            setSubmitted={setFemaleSubmitted}
          />
        </div>
        {(allPhenotypes.length === 0) &&
          (femaleSubmitted && maleSubmitted) && (
            <Button
              className="firstButton"
              onClick={makeFirstGeneration}
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
        {(allPhenotypes.length >= 1) && <PhenotypeRow
          Component={F1Table}
          phenotypes={allPhenotypes[0]}
          options={uniqueMutationNames}
          F1Male={F1Male}
          F1Female={F1Female}
          setF1Male={setF1Male}
          setF1Female={setF1Female}
        />}
        {(allPhenotypes.length >= 2) && <PhenotypeRow
          Component={F2Table}
          phenotypes={allPhenotypes[1]}
          options={uniqueMutationNames}
        />}
      </div>
    </div>
  );
}
