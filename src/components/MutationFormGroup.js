import React, { useState } from 'react';
import { Form } from 'react-bootstrap'
import traitDictByCategory from '../utils/traitDictByCategory';

export default function MutationFormGroup({ category, mutationList, setMutationList }) {
  const title = category.charAt(0).toUpperCase() + category.slice(1);
  const traitList = traitDictByCategory[category];
  const [categoryValue, setCategoryValue] = useState('wild type')

  return (
    <Form.Group>
      <Form.Control
        size="sm"
        as="select"
        variant="primary"
        onChange={e => {
          let val = e.target.value;
          setCategoryValue(val)
          if (val !== 'wild type') {
            setMutationList({ ...mutationList, [category]: val })
          } else {
            // FIXME: wtf
            let tempList = JSON.parse(JSON.stringify(mutationList))
            delete tempList[category]
            setMutationList({ ...tempList })
          }
        }}
        value={categoryValue}
      >
        <option>{`${title}: no mutation`}</option>
        {traitList.map(trait => <option key={trait} >{trait}</option>)}
      </Form.Control>
    </Form.Group>
  )
}
