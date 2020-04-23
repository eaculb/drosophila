import React from 'react';
import MutationForm from './MutationForm'

export default function Selector({ title, ...props }) {
  return (
    <div className="mutation-form m-1 p-2 border rounded">
      <h4>{title}</h4>
      <MutationForm {...props}/>
    </div>
  )
}