import React from 'react';
import { Form, Button } from 'react-bootstrap'

function MutationFormGroup({ title, traitList, setter }) {
  return (
    <Form.Group>
      <Form.Label>{title}</Form.Label>
      <Form.Control
        as="select"
        variant="primary"
        onChange={setter}
      >
        <option>wild type</option>
        {traitList.map(trait => <option key={trait}>{trait}</option>)}
      </Form.Control>
    </Form.Group>
  )
}

export default function MutationForm({ dict, title, values, setter, onSubmit }) {

  function categorySetter(key) {
    return (e) => {
      setter({ ...values, [key]: e.target.value })
    }
  }

  return (
    <Form>
      <MutationFormGroup title="Eyes" traitList={dict.eyes} setter={categorySetter('eyes')} />
      <MutationFormGroup title="Body" traitList={dict.body} setter={categorySetter('body')} />
      <MutationFormGroup title="Wings" traitList={dict.wings} setter={categorySetter('wings')} />
      <MutationFormGroup title="Bristles" traitList={dict.bristles} setter={categorySetter('bristles')} />
      <MutationFormGroup title="Antennae" traitList={dict.antennae} setter={categorySetter('antennae')} />
      <MutationFormGroup title="Misc" traitList={dict.misc} setter={categorySetter('misc')} />
      <Button variant="primary" onClick={onSubmit}>
        Submit
      </Button>
    </Form>
  )
}