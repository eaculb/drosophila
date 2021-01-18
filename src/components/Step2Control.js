import React from "react";
import Button from "react-bootstrap/Button";

import F1ParentSelector from "./F1ParentSelector";

export default function Step2Control({
  allGenotypes,
  allPhenotypes,
  traitOptions,
  F1ParentsMale,
  F1ParentsFemale,
  setF1ParentsMale,
  setF1ParentsFemale,
  makeF2Generation,
  reset,
}) {
  return (
    <>
      <F1ParentSelector
        disabled={allPhenotypes.length > 1}
        phenotypes={allPhenotypes[0]}
        traitOptions={traitOptions}
        F1ParentsMale={F1ParentsMale}
        F1ParentsFemale={F1ParentsFemale}
        setF1ParentsMale={setF1ParentsMale}
        setF1ParentsFemale={setF1ParentsFemale}
      />
      {allPhenotypes.length === 1 ? (
        <Button
          className="firstButton"
          onClick={() => makeF2Generation(allGenotypes[0])}
        >
          Make F2 Generation
        </Button>
      ) : (
        <Button className="firstButton" variant="danger" onClick={reset}>
          Reset
        </Button>
      )}
    </>
  );
}
