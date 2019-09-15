import React from 'react';

interface Props {
  name: string,
  category: string, 
  selected: boolean,
}

export default function TraitButton({name, category, selected}: Props) {
  let classname = category + " " + (!selected && "unclicked")
  
  return(
    <button 
    className={classname}

    >
    {name.toLowerCase()}
    </button>
  )
}