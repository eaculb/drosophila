import React from 'react';
import Table from './Table';

import permutations from '../utils/permutations';

export default function PhenotypeRow({ title, traitOptions, ...props}) {
  const options = permutations(traitOptions)
  return (
    <div className="p-2">
      <h5 className="generation-label">{title}</h5>
      <div className="select-and-table">
        <Table options={options} {...props}/>
      </div>
    </div>
  )
}