import React, { useState } from 'react';
import MutationForm from './MutationForm'

export default function Selector({ dict, title, setter, values }) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="mutation-form m-2 p-2 border rounded">
      <h4>{title}</h4>
      {!submitted ? (
        <MutationForm
          dict={dict}
          title={title}
          values={values}
          setter={setter}
          onSubmit={() => {
            setSubmitted(true);
            console.log(values);
          }}
        />
      ) : (
          <p>hi</p>
        )}
    </div>
  )
}