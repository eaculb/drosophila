import React, { useState } from 'react';

export default function Selector() {
  const [maleIsMutant, chooseMaleIsMutant] = useState(true)
  const [femaleIsMutant, chooseFemaleIsMutant] = useState(false)

  return(
    <div>
      <h4>Select which parents are mutants:</h4>
      <button><img 
      src="../static/female_symbol.svg"/></button>
    </div>
  )
}