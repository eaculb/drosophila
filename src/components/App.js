import React, { useState } from 'react';
import '../index.css';
import '../App.css';
import { traitDictionary } from '../traitDictionary'
import Selector from './Selector'

const traitNamesByCategory = (categoryName) => {
  let returnList = new Array(0);
  returnList.push("wild type");
  Object.entries(traitDictionary).forEach(
    ([name, details]) => {
      if (details.category === categoryName) {
        returnList.push(name);
      }
    }
  );
  return returnList;
};

const traitCategories = {
  "eyes": traitNamesByCategory("eyes"),
  "body": traitNamesByCategory("body"),
  "wings": traitNamesByCategory("wings"),
  "bristles": traitNamesByCategory("bristles"),
  "antennae": traitNamesByCategory("antennae"),
  "misc": traitNamesByCategory("misc")
}

// function chromosomesFromMutations(mutationValues) {
//   Object.entries(mutationValues).forEach(
//     ([_, value]) => console.log(value)
//   );
// }

export default function App() {

  const [mutationValuesMale, setMutationValuesMale] = useState({
    eyes: 'wild type',
    body: 'wild type',
    wings: 'wild type',
    antennae: 'wild type',
    bristles: 'wild type',
    misc: 'wild type',
  })

  const [mutationValuesFemale, setMutationValuesFemale] = useState({
    eyes: 'wild type',
    body: 'wild type',
    wings: 'wild type',
    antennae: 'wild type',
    bristles: 'wild type',
    misc: 'wild type',
  })

  const setMutationValue = (values, setter) => {
    return (category, value) => {
      setter({
        ...values,
        category: value,
      })
    }
  }

  return (
    <>
      <div className="selector-container">
        <Selector
          dict={traitCategories}
          title="Male"
          mutationValues={mutationValuesMale}
          setMutationValue={setMutationValue(mutationValuesMale, setMutationValuesMale)}
        />
        <Selector
          dict={traitCategories}
          title="Female"
          mutationValues={mutationValuesFemale}
          setMutationValue={setMutationValue(mutationValuesFemale, setMutationValuesFemale)}
        />
      </div>
    </>
  );
}
