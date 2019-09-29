import React, { useState } from 'react';
import '../index.css';
import '../App.css';
import { traitDictionary } from '../traitDictionary'
import Selector from './Selector'

// const traitNamesByCategory = (categoryName) => {
//   let returnList = new Array(0);
//   for (var trait of traitDictionary) {
//     if (trait.details.category === categoryName) {
//       returnList.push(trait.name);
//     }
//   }
//   return returnList;
// };

const traitObjectsByCategory = (categoryName) => {
  let returnList = new Array(0);
  for (var trait of traitDictionary) {
    if (trait.details.category === categoryName) {
      returnList.push(trait);
    }
  }
  return returnList;
};

const traitDictByCategory = {
  "eyes": traitObjectsByCategory("eyes"),
  "body": traitObjectsByCategory("body"),
  "wings": traitObjectsByCategory("wings"),
  "bristles": traitObjectsByCategory("bristles"),
  "antennae": traitObjectsByCategory("antennae"),
  "misc": traitObjectsByCategory("misc")
}

export default function App() {

  const [mutationValuesMale, setMutationValuesMale] = useState({})
  const [mutationValuesFemale, setMutationValuesFemale] = useState({})

  return (
    <>
      <div className="selector-container">
        <Selector dict={traitDictByCategory} title="Male" values={mutationValuesMale} setter={setMutationValuesMale}/>
        <Selector dict={traitDictByCategory} title="Female" values={mutationValuesFemale} setter={setMutationValuesFemale}/>
      </div>
    </>
  );
}
