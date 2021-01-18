import React, { useState, useEffect } from "react";
import { union, random } from "lodash";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import phenotypeFromGenotype from "../utils/phenotypeFromGenotype";
import makeChildGenotype from "../utils/makeChildGenotype";
import { traitDictionary } from "../traitDictionaryByName";

import Step1Control from "./Step1Control";
import Step2Control from "./Step2Control";
import PhenotypeRow from "./PhenotypeRow";
import Titlebar from "./Titlebar";

import match from "../utils/match";
import isMale from "../utils/isMale";
import isAlive from "../utils/isAlive";
import makeP1Genotype from "../utils/makeP1Genotype";

const GENERATION_SIZE = 1000;

function getMutationList(selectedMutationsByCategory) {
  let result = [];
  for (var mutation of Object.values(selectedMutationsByCategory)) {
    result.push(traitDictionary[mutation]);
  }
  return result;
}

export default function App() {
  const [mutationValuesMale, setMutationValuesMale] = useState({});
  const [mutationValuesFemale, setMutationValuesFemale] = useState({});

  const [allGenotypes, setAllGenotypes] = useState([]);
  const [allPhenotypes, setAllPhenotypes] = useState([]);

  const [traitOptions, setTraitOptions] = useState([]);

  const [F1ParentsMale, setF1ParentsMale] = useState([]);
  const [F1ParentsFemale, setF1ParentsFemale] = useState([]);

  useEffect(() => {
    setTraitOptions(
      union(
        Object.values(mutationValuesMale),
        Object.values(mutationValuesFemale)
      )
    );
  }, [mutationValuesMale, mutationValuesFemale]);

  const reset = () => {
    setMutationValuesMale({});
    setMutationValuesFemale({});
    setAllGenotypes([]);
    setAllPhenotypes([]);
  };

  const makeF1Generation = (mutationValuesMale, mutationValuesFemale) => {
    let maleGenotype = makeP1Genotype(
      getMutationList(mutationValuesMale),
      false
    );
    let femaleGenotype = makeP1Genotype(
      getMutationList(mutationValuesFemale),
      true
    );

    var genotypes = [];
    var phenotypes = [];

    for (var i = 0; i < GENERATION_SIZE; i++) {
      let childGenotype = makeChildGenotype(femaleGenotype, maleGenotype);
      genotypes.push(childGenotype);
      phenotypes.push(phenotypeFromGenotype(childGenotype));
    }

    setAllGenotypes([...allGenotypes, genotypes]);
    setAllPhenotypes([...allPhenotypes, phenotypes]);
  };

  // TODO: eventually generalize this maybe? But for now that's just too
  // complicated w/ allowing the next generation's parents to be filtered
  const makeF2Generation = (F1Genotypes) => {
    const livingParents = F1Genotypes.filter((g) => isAlive(g));
    const maleGenotypes = livingParents.filter((genotype) => {
      if (!isMale(genotype)) {
        return false;
      }
      let phenotype = phenotypeFromGenotype(genotype);
      return match(
        Object.keys(phenotype).filter(
          (key) => key !== "alive" && key !== "female" && phenotype[key]
        ),
        F1ParentsMale
      );
    });
    const femaleGenotypes = livingParents.filter((genotype) => {
      if (isMale(genotype)) {
        return false;
      }
      let phenotype = phenotypeFromGenotype(genotype);
      return match(
        Object.keys(phenotype).filter(
          (key) => key !== "alive" && key !== "female" && phenotype[key]
        ),
        F1ParentsFemale
      );
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
  };

  return (
    <div className="app-container">
      <Titlebar />
      <Row className="app">
        <Col xs="auto">
          <Step1Control
            active={allPhenotypes.length === 0}
            mutationValuesMale={mutationValuesMale}
            mutationValuesFemale={mutationValuesFemale}
            setMutationValuesMale={setMutationValuesMale}
            setMutationValuesFemale={setMutationValuesFemale}
            makeF1Generation={makeF1Generation}
          />
          {allPhenotypes.length > 0 && (
            <Step2Control
              allGenotypes={allGenotypes}
              allPhenotypes={allPhenotypes}
              traitOptions={traitOptions}
              F1ParentsMale={F1ParentsMale}
              F1ParentsFemale={F1ParentsFemale}
              setF1ParentsMale={setF1ParentsMale}
              setF1ParentsFemale={setF1ParentsFemale}
              makeF2Generation={makeF2Generation}
              reset={reset}
            />
          )}
        </Col>
        <Col xs="auto">
          {allPhenotypes.length >= 1 && (
            <PhenotypeRow
              title="F1 Generation"
              phenotypes={allPhenotypes[0]}
              traitOptions={traitOptions}
            />
          )}
          {allPhenotypes.length >= 2 && (
            <PhenotypeRow
              title="F2 Generation"
              phenotypes={allPhenotypes[1]}
              traitOptions={traitOptions}
            />
          )}
        </Col>
      </Row>
    </div>
  );
}
