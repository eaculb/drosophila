import '../index.css';
import '../App.css';

import React, { useState } from 'react';
import { union, random } from 'lodash';

import { traitDictionary } from '../traitDictionaryByName'
import Selector from './Selector'
import PhenotypeRow from './PhenotypeRow'

import { Button } from 'react-bootstrap'

const GENERATION_SIZE = 1000;
const NUM_F_GENERATIONS = 2;

const traitNamesByCategory = (categoryName) => {
  let returnList = new Array(0);
  for (var trait in traitDictionary) {
    if (traitDictionary[trait].category === categoryName) {
      returnList.push(trait);
    }
  };
  return returnList;
};

const traitDictByCategory = {
  "eyes": traitNamesByCategory("eyes"),
  "body": traitNamesByCategory("body"),
  "wings": traitNamesByCategory("wings"),
  "bristles": traitNamesByCategory("bristles"),
  "antennae": traitNamesByCategory("antennae"),
  "misc": traitNamesByCategory("misc")
}

function getSelectedMutations(mutationValues) {
  let returnList = [];
  for (var category in mutationValues) {
    var traitName = mutationValues[category];
    if (traitName !== "wild type"){
      returnList.push(traitDictionary[traitName]);
    }
  }
  return returnList;
}

function phenotypeFromGenotype(genotype, uniqueMutationNames) {
  let phenotype = { alive: true }
  phenotype["female"] = (!!genotype.X.b);
  for (let chromosomeNumber of [1, 2, 3, "X"]) {
    var chromosome = genotype[chromosomeNumber];
    for (var mutationName of uniqueMutationNames) {
      let mutA = chromosome.a[mutationName];
      let mutB = chromosome.b[mutationName];
      let mutation = mutA || mutB;
      if (mutation) {
        if (mutation.lethal && mutA && mutB) {
          return { alive: false }
        }
        if (mutation.dominant || (mutA && mutB) || (mutA && !chromosome.b)) {
          phenotype[mutationName] = true;
        } else {
          phenotype[mutationName] = false;
        }
      } else if (traitDictionary[mutationName].chromosome === chromosomeNumber) {
        phenotype[mutationName] = false;
      }
    }
  }
  return phenotype;
}

function makeOrder0Genotype(mutations, male) {
  let chromosomes = {
    1: { a: {}, b: {} },
    2: { a: {}, b: {} },
    3: { a: {}, b: {} },
    X: { a: {}, b: male ? false : {} },
  }
  for (var mutation of mutations) {
    let chromosomeToPush;
    const chromosomeVal = mutation.chromosome;
    if (chromosomeVal === 'X') {
      chromosomeToPush = chromosomes.X;
    } else {
      chromosomeToPush = chromosomes[chromosomeVal];
    }
    chromosomeToPush.a[mutation.name] = mutation;
    if (!mutation.lethal && !(male && chromosomeVal === 'X')) {
      chromosomeToPush.b[mutation.name] = mutation;
    }
  }
  return chromosomes;
}

function choose({ a, b }) {
  if (Math.random() < 0.5) {
    return a;
  } else {
    return b;
  }
}

function makeChildGenotype(male, female) {
  let chromosomes = {};
  for (var j of [1, 2, 3, "X"]) {
    chromosomes[j] = {};
    chromosomes[j]["a"] = choose(female[j])
    chromosomes[j]["b"] = choose(male[j])
  }
  return chromosomes;
}

function makeFirstCross(maleMutations, femaleMutations, uniqueMutationNames) {
  let maleGenotype = makeOrder0Genotype(maleMutations, true);
  let femaleGenotype = makeOrder0Genotype(femaleMutations, false);

  var genotypes = [];
  var phenotypes = [];

  for (var i = 0; i < GENERATION_SIZE; i++) {
    let childGenotype = makeChildGenotype(maleGenotype, femaleGenotype)
    genotypes.push(childGenotype);
    phenotypes.push(phenotypeFromGenotype(childGenotype, uniqueMutationNames));
  }
  return { genotypes, phenotypes }
}


function makeCross(parentGenotypes, uniqueMutationNames) {
  const maleGenotypes = parentGenotypes.filter(genotype => !genotype.X.b && phenotypeFromGenotype(genotype, uniqueMutationNames).alive);
  const femaleGenotypes = parentGenotypes.filter(genotype => genotype.X.b && phenotypeFromGenotype(genotype, uniqueMutationNames).alive);

  var genotypes = [];
  var phenotypes = [];

  for (var i = 0; i < GENERATION_SIZE; i++) {
    let maleGenotype = maleGenotypes[random(maleGenotypes.length-1)];
    let femaleGenotype = femaleGenotypes[random(femaleGenotypes.length-1)];
    let childGenotype = makeChildGenotype(maleGenotype, femaleGenotype);
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

  const maleMutations = getSelectedMutations(mutationValuesMale);
  const femaleMutations = getSelectedMutations(mutationValuesFemale);

  const uniqueMutationNames = union(femaleMutations.map(mutation=>mutation && mutation.name), maleMutations.map(mutation=>mutation && mutation.name));

  const reset = () => {
    setMutationValuesMale({});
    setMutationValuesFemale({});
    setAllGenotypes([]);
    setAllPhenotypes([]);
    setMaleSubmitted(false);
    setFemaleSubmitted(false);
  }

  const makeFirstGeneration = () => {
    const { genotypes, phenotypes } = makeFirstCross(maleMutations, femaleMutations, uniqueMutationNames);
    setAllGenotypes([...allGenotypes, genotypes]);
    setAllPhenotypes([...allPhenotypes, phenotypes]);
  }

  const makeGeneration = () => {
    let currentGenotypes = allGenotypes[allGenotypes.length - 1];
    const { genotypes, phenotypes } = makeCross(currentGenotypes, uniqueMutationNames);
    setAllGenotypes([...allGenotypes, genotypes]);
    setAllPhenotypes([...allPhenotypes, phenotypes]);
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
        {(allPhenotypes.length === 0) && (
          <Button
            className="firstButton"
            onClick={makeFirstGeneration}
            disabled={!(femaleSubmitted && maleSubmitted)}
          >
            Make F1 Generation
        </Button>
        )}
        {(allPhenotypes.length > 0 && allPhenotypes.length < NUM_F_GENERATIONS) && (
            <Button
              className="firstButton"
              onClick={makeGeneration}
            >
              {`Make F${allPhenotypes.length+1} Generation`}
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
        {allPhenotypes.map((phenotypes, index) =>
          <PhenotypeRow
            key={index}
            index={index}
            phenotypes={phenotypes}
            options={uniqueMutationNames}
          />
        )}
      </div>
    </div>
  );
}
