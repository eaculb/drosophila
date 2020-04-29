import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap'
import traitDictByCategory from '../utils/traitDictByCategory';

function MutationFormGroup({ category, mutationList, setMutationList }) {
  const title = category.charAt(0).toUpperCase() + category.slice(1);
  const traitList = traitDictByCategory[category];
  const [categoryValue, setCategoryValue] = useState('wild type')

  return (
    <Form.Group>
      <Form.Label>{title}</Form.Label>
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
        <option>wild type</option>
        {traitList.map(trait => <option key={trait} >{trait}</option>)}
      </Form.Control>
    </Form.Group>
  )
}

export default function MutationForm({ onSubmit, mutationList, setMutationList, submitted, setSubmitted }) {
  return (
    <Form onSubmit={(e) => {
      setSubmitted(true);
      e.preventDefault();
    }}>
      {!submitted ? (
        <>
          <MutationFormGroup category="eyes" mutationList={mutationList} setMutationList={setMutationList} />
          <MutationFormGroup category="body" mutationList={mutationList} setMutationList={setMutationList} />
          <MutationFormGroup category="wings" mutationList={mutationList} setMutationList={setMutationList} />
          <MutationFormGroup category="bristles" mutationList={mutationList} setMutationList={setMutationList} />
          <MutationFormGroup category="antennae" mutationList={mutationList} setMutationList={setMutationList} />
          <MutationFormGroup category="misc" mutationList={mutationList} setMutationList={setMutationList} />
          <Button type="submit" size="sm" variant="primary">
            Submit
          </Button>
        </>
      ) : (
          <>
            {((Object.keys(mutationList)).length === 0) && <p className="wild-type">wild type</p>}
            <p>{mutationList.eyes} </p>
            <p>{mutationList.body}</p>
            <p>{mutationList.wings}</p>
            <p>{mutationList.bristles}</p>
            <p>{mutationList.antennae}</p>
            <p>{mutationList.misc}</p>
          </>
        )}
    </Form>
  )
}