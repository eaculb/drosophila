import React from 'react';
import MutationForm from './MutationForm'

export default function Selector({ title, selectedMutations, submitted, setSubmitted, ...props }) {
  if (!selectedMutations) {
    selectedMutations = [];
  }

  return (
    <div className="mutation-form m-1 p-2 border rounded">
      <h4>{title}</h4>
      {!submitted ? (
        <MutationForm
          onSubmit={() => {
            setSubmitted(true);
          }}
          {...props}
        />
      ) : (
          <>{selectedMutations.map(mutation => <p key={mutation.name}>{mutation.name}</p>)}</>
        )}
    </div>
  )
}