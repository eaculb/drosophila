import React, { useState, useEffect } from 'react';
import { union, random } from 'lodash';

import phenotypeFromGenotype from '../utils/phenotypeFromGenotype';
import makeChildGenotype from '../utils/makeChildGenotype';
import { traitDictionary } from '../traitDictionaryByName'

import F1ParentSelector from './F1ParentSelector';
import P0Selector from './Selector'
import PhenotypeRow from './PhenotypeRow'

import { Button } from 'react-bootstrap'
import match from '../utils/match';
import isMale from '../utils/isMale';
import isAlive from '../utils/isAlive';
import makeP1Genotype from '../utils/makeP1Genotype';

const GENERATION_SIZE = 1000;

function getMutationList(selectedMutationsByCategory) {
  let result = []
  for (var mutation of Object.values(selectedMutationsByCategory)) {
    result.push(traitDictionary[mutation])
  }
  return result;
}


export default function App() {

  const [mutationValuesMale, setMutationValuesMale] = useState({});
  const [mutationValuesFemale, setMutationValuesFemale] = useState({});

  const [allGenotypes, setAllGenotypes] = useState([]);
  const [allPhenotypes, setAllPhenotypes] = useState([]);

  const [maleSubmitted, setMaleSubmitted] = useState(false);
  const [femaleSubmitted, setFemaleSubmitted] = useState(false);

  const [traitOptions, setTraitOptions] = useState([]);

  const [F1ParentsMale, setF1ParentsMale] = useState([]);
  const [F1ParentsFemale, setF1ParentsFemale] = useState([]);

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

  const makeF1Generation = (mutationValuesMale, mutationValuesFemale) => {
    let maleGenotype = makeP1Genotype(getMutationList(mutationValuesMale), false);
    let femaleGenotype = makeP1Genotype(getMutationList(mutationValuesFemale), true);

    var genotypes = [];
    var phenotypes = [];

    for (var i = 0; i < GENERATION_SIZE; i++) {
      let childGenotype = makeChildGenotype(femaleGenotype, maleGenotype)
      genotypes.push(childGenotype);
      phenotypes.push(phenotypeFromGenotype(childGenotype));
    }

    setAllGenotypes([...allGenotypes, genotypes]);
    setAllPhenotypes([...allPhenotypes, phenotypes]);
  }

  // TODO: eventually generalize this maybe? But for now that's just too 
  // complicated w/ allowing the next generation's parents to be filtered
  const makeF2Generation = (F1Genotypes) => {
    const livingParents = F1Genotypes.filter(g => isAlive(g));
    const maleGenotypes = livingParents.filter(genotype => {
      if (!isMale(genotype)) {
        return false
      };
      let phenotype = phenotypeFromGenotype(genotype);
      return match(Object.keys(phenotype).filter(key => (key !== 'alive' && key !== 'female' && phenotype[key])), F1ParentsMale)
    });
    const femaleGenotypes = livingParents.filter(genotype => {
      if (isMale(genotype)) {
        return false
      };
      let phenotype = phenotypeFromGenotype(genotype);
      return match(Object.keys(phenotype).filter(key => (key !== 'alive' && key !== 'female' && phenotype[key])), F1ParentsFemale)
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

    setAllGenotypes([...allGenotypes, genotypes]);
    setAllPhenotypes([...allPhenotypes, phenotypes]);
  }

  return (
    <div className="app">
      <div className="left p-1 border-right">
        <div className="selector-container">
          <P0Selector
            title="P0 Male"
            mutationList={mutationValuesMale}
            setMutationList={setMutationValuesMale}
            submitted={maleSubmitted}
            setSubmitted={setMaleSubmitted}
          />
          <P0Selector
            title="P0 Female"
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
              onClick={() => makeF1Generation(mutationValuesMale, mutationValuesFemale)}
            >
              {'Make F1 Generation'}
            </Button>)
        }
        {(allPhenotypes.length >= 1) && (
          <F1ParentSelector
            disabled={(allPhenotypes.length > 1)}
            phenotypes={allPhenotypes[0]}
            traitOptions={traitOptions}
            F1ParentsMale={F1ParentsMale}
            F1ParentsFemale={F1ParentsFemale}
            setF1ParentsMale={setF1ParentsMale}
            setF1ParentsFemale={setF1ParentsFemale}
          />
        )}
        {(allPhenotypes.length === 1) && (
          <Button
            className="firstButton"
            onClick={() => makeF2Generation(allGenotypes[0])}
          >
            {'Make F2 Generation'}
          </Button>
        )}
        {(allPhenotypes.length === 2) && (
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
            title="F1 Generation"
            phenotypes={allPhenotypes[0]}
            traitOptions={traitOptions}
          />
        )}
        {(allPhenotypes.length >= 2) && (
          <PhenotypeRow
            title="F2 Generation"
            phenotypes={allPhenotypes[1]}
            traitOptions={traitOptions}
          />
        )}
      </div>
    </div>
  );
}
