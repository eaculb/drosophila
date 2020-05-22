import React, { useEffect } from 'react';
import { Form, Col } from 'react-bootstrap'

import countPhenotypes from '../utils/countPhenotypes';
import getStringifiedList from '../utils/getStringifiedList';
import permutations from '../utils/permutations';

export default function F1ParentSelector({ disabled, phenotypes, traitOptions, F1ParentsMale, F1ParentsFemale, setF1ParentsMale, setF1ParentsFemale }) {

  const phenotypeOptions = permutations(traitOptions);
  // FIXME: shouldn't have to recalculate this
  let femaleCounts = {}
  let maleCounts = {}
  for (var option of phenotypeOptions) {
    femaleCounts[option] = countPhenotypes(['female', ...option], phenotypes);
    maleCounts[option] = countPhenotypes(option, phenotypes);
  }

  // Run on mount
  // FIXME: this is messy. Should be able to use defaultValue somehow
  useEffect(() => {
    setF1ParentsFemale(phenotypeOptions.filter(o => femaleCounts[o] > 0)[0])
    setF1ParentsMale(phenotypeOptions.filter(o => maleCounts[o] > 0)[0])
  }, [])

  return (
    <Form className="p-2 w-100">
      <h4>{'Select parents for the F2 generation:'}</h4>
      <Form.Row>
        <Col>
          <Form.Group>
            <Form.Label>Male Phenotype</Form.Label>
            <Form.Control
              disabled={disabled}
              size="sm"
              as="select"
              variant="primary"
              onChange={e => {
                let val = e.target.value;
                setF1ParentsMale(val === '' ? [] : val.split(','));
                e.preventDefault();
              }}
              value={F1ParentsMale}
            >
              {phenotypeOptions.map((option, ix) => (maleCounts[option] > 0) && <option key={ix} value={option}>{getStringifiedList(option)}</option>)}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Female Phenotype</Form.Label>
            <Form.Control
              disabled={disabled}
              size="sm"
              as="select"
              variant="primary"
              onChange={e => {
                let val = e.target.value;
                setF1ParentsFemale(val === '' ? [] : val.split(','))
                e.preventDefault();
              }}
              value={F1ParentsFemale}
            >
              {phenotypeOptions.map((option, ix) => (femaleCounts[option] > 0) && <option key={ix} value={option}>{getStringifiedList(option)}</option>)}
            </Form.Control>
          </Form.Group>
        </Col>
      </Form.Row>
    </Form>
  )
}