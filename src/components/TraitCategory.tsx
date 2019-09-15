import React from 'react';
import TraitButton from './TraitButton'

const traitDictionary = require('../static/traits.js')
const traitDictionaryKeyed = traitDictionary.map(trait => {
  let name = trait.name;
  return({name: trait});
  }
)

export default function TraitCategory({category, selectedTrait}) {
  return(
    <div>
    <h3>{category}</h3>
    {traitDictionary.map(
      entry => (
        entry.category === category && 
        <TraitButton 
          key={entry.name} 
          category={category}
          name={entry.name}
          selected={(entry.name === selectedTrait)}
          onClick={(traitName) => this.props.handleTraitSelection(category, traitName)}
        />
      )
    )}
    </div>
  )
}