import React from 'react';
import MutationFormGroup from './MutationFormGroup'

export default function Selector({ title, ...props }) {
  return (
    <div className="mutation-form m-1 p-2">
      <h4>{title}</h4>
      <MutationFormGroup category="eyes" {...props} />
      <MutationFormGroup category="body" {...props} />
      <MutationFormGroup category="wings" {...props} />
      <MutationFormGroup category="bristles" {...props} />
      <MutationFormGroup category="antennae" {...props} />
      <MutationFormGroup category="misc" {...props} />
    </div>
  )
}