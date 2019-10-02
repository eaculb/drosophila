import React, { useState } from 'react';
import { Form } from 'react-bootstrap'

import PhenotypeTable from './PhenotypeTable'

export default function PhenotypeRow({ index, phenotypes, options }) {
  const [trait1, setTrait1] = useState("female");
  const [trait2, setTrait2] = useState(options[0] || null);

  function TraitFormGroup({ title, setter, defaultOption }) {
    return (
      <Form.Group>
        <Form.Label>{title}:</Form.Label>
        <Form.Control
          as="select"
          variant="primary"
          defaultValue={defaultOption}
          onChange={(e) => {
            if (e.target.value === "sex") {
              setter("female");
            } else {
              setter(e.target.value);
            }
          }}
        >
          <option key="sex">sex</option>
          {options.map(option => <option key={option}>{option}</option>)}
        </Form.Control>
      </Form.Group>
    )
  }

  return (
    <div className="p-2">
      <h5 className="generation-label">{`F${index+1} Generation`}</h5>
      <div className="select-and-table">
        <Form>
          <TraitFormGroup title="Trait 1" setter={setTrait1} defaultOption={trait1} />
          {!!options.length && (<TraitFormGroup title="Trait 2" setter={setTrait2} defaultOption={trait2} />)}
        </Form>
        <PhenotypeTable trait1={trait1} trait2={trait2} phenotypes={phenotypes} />
      </div>
    </div>
  )
}