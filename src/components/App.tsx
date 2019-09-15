import React, { useState } from 'react';
import '../index.css';
import '../App.css';

import TraitGroup from './TraitGroup'
import Selector from './Selector'

const categories = [
  "eyes",
  "body",
  "wings",
  "antennae",
  "bristles",
  "misc"
]

export default function App(){
  const [eyes, setEyes] = useState(null);
  const [body, setBody] = useState(null);
  const [wings, setWings] = useState(null);
  const [bristles, setBristles] = useState(null);
  const [antennae, setAntennae] = useState(null);
  const [misc, setMisc] = useState(null);

  let generations = Array(0)

  return (
    <div>
      <header className="app-header">
        <h1>FLIES</h1>
      </header>
      <div className="app">
        <div className="trait-selection">          
          <TraitGroup 
          className="trait-category"
          category="eyes"
          selectedTrait={eyes}
          traitSetter={setEyes}
          />
          <TraitGroup 
          className="trait-category"
          category="body"
          selectedTrait={body}
          traitSetter={setBody}
          />
          <TraitGroup 
          className="trait-category"
          category="wings"
          selectedTrait={wings}
          traitSetter={setWings}
          />
          <TraitGroup 
          className="trait-category"
          category="bristles"
          selectedTrait={bristles}
          traitSetter={setBristles}
          />
          <TraitGroup 
          className="trait-category"
          category="antennae"
          selectedTrait={antennae}
          traitSetter={setAntennae}
          />
          <TraitGroup 
          className="trait-category"
          category="misc"
          selectedTrait={misc}
          traitSetter={setMisc}
          />       
        </div>
        <div className="app-results">
          <Selector 
            className="selector"
            onClick={(generation, clicked) => this.selectParents(generation, clicked)}
          />
        </div>
      </div>
    </div>
  );
}
