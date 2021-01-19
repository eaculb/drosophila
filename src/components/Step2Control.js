import React from "react";
import Button from "react-bootstrap/Button";

import F1ParentSelector from "./F1ParentSelector";
import StepTitle from "./StepTitle";

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
    <div className="step">
      <StepTitle step="2" title="Select F1 Parent Phenotypes" />
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
          className="mutation-form-submit"
          onClick={() => makeF2Generation(allGenotypes[0])}
        >
          Make F2 Generation
        </Button>
      ) : (
        <Button
          className="mutation-form-submit"
          variant="danger"
          onClick={reset}
        >
          Reset
        </Button>
      )}
    </div>
  );
}
