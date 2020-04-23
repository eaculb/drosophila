import React, { useState } from 'react';
import { Form } from 'react-bootstrap'

export default function PhenotypeRow({ index, options, Component, ...props }) {
  const [trait, setTrait] = useState(options[0] || null);
  
  function TraitFormGroup({ title }) {
    return (
      <Form.Group>
        <Form.Label>{title}:</Form.Label>
        <Form.Control
          as="select"
          variant="primary"
          defaultValue={trait}
          onChange={(e) => setTrait(e.target.value)}
        >
          {options.map(option => <option key={option}>{option}</option>)}
        </Form.Control>
      </Form.Group>
    )
  }

  return (
    <div className="p-2">
      <h5 className="generation-label">{`F${index+1} Generation`}</h5>
      <div className="select-and-table">
        {/* {(options.length > 0) && (<Form>
          <TraitFormGroup title="Trait" />
        </Form>)} */}
        <Component trait={trait} {...props} />
      </div>
    </div>
  )
}