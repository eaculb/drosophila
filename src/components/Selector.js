import React, { useState } from 'react';
import MutationForm from './MutationForm'

export default function Selector({ dict, title, mutationValues, setMutationValue }) {
  const [submitted, setSubmitted] = useState(false);

  const mutationList = (mutationValues) => {
    console.log(mutationValues)
    let returnList = [];
    for (var mutation of Object.values(mutationValues)) {
      if (mutation !== 'wild type') {
        returnList.push(mutation);
      }
    };
    return returnList;
  }

  return (
    <div className="mutation-form m-2 p-2 border rounded">
      <h4>{title}</h4>
      {!submitted ? (
        <MutationForm
          dict={dict}
          title={title}
          setMutationValue={setMutationValue}
          onSubmit={() => setSubmitted(true)}
        />
      ) : (
          <>{mutationList(mutationValues).map(mutation => <p>{mutation}</p>)}</>
        )}
    </div>
  )
}