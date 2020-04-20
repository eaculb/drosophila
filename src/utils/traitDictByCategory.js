
import { traitDictionary } from '../traitDictionaryByName'

const traitNamesByCategory = (categoryName) => {
  let returnList = new Array(0);
  for (var trait in traitDictionary) {
    if (traitDictionary[trait].category === categoryName) {
      returnList.push(trait);
    }
  };
  return returnList;
};

export default {
  "eyes": traitNamesByCategory("eyes"),
  "body": traitNamesByCategory("body"),
  "wings": traitNamesByCategory("wings"),
  "bristles": traitNamesByCategory("bristles"),
  "antennae": traitNamesByCategory("antennae"),
  "misc": traitNamesByCategory("misc")
}