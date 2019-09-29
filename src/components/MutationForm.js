import React from 'react';
import { Form, Button } from 'react-bootstrap'


export default function MutationForm({ dict, title, setMutationValue, onSubmit }) {

  function MutationFormGroup({ title, category, handleChange }) {
    
    return (
      <Form.Group controlId="formGridState">
        <Form.Label>{title}</Form.Label>
        <Form.Control as="select" variant="primary" onChange={(e) => handleChange(title.toLowerCase(), e.target.value)}>
          {category.map(trait => <option key={trait}>{trait}</option>)}
        </Form.Control>
      </Form.Group>
    )
  }

  return (
    <Form>
      <MutationFormGroup title="Eyes" category={dict.eyes} handleChange={setMutationValue} />
      <MutationFormGroup title="Body" category={dict.body} handleChange={setMutationValue} />
      <MutationFormGroup title="Wings" category={dict.wings} handleChange={setMutationValue} />
      <MutationFormGroup title="Bristles" category={dict.bristles} handleChange={setMutationValue} />
      <MutationFormGroup title="Antennae" category={dict.antennae} handleChange={setMutationValue} />
      <MutationFormGroup title="Misc" category={dict.misc} handleChange={setMutationValue} />
      <Button variant="primary" onClick={onSubmit}>
        Submit
      </Button>
    </Form>
  )
}