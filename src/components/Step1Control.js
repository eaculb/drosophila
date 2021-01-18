import React from "react";
import Button from "react-bootstrap/Button";

import Selector from "./Selector";
import SelectedList from "./SelectedList";
import StepTitle from "./StepTitle";

export default function Step1Control({
  active,
  mutationValuesMale,
  setMutationValuesMale,
  mutationValuesFemale,
  setMutationValuesFemale,
  makeF1Generation,
}) {
  const className = active ? "step-1" : "step-1 completed";
  return (
    <div className={className}>
      <StepTitle step="1" title="Select P0 Phenotypes" />
      {active ? (
        <>
          <div className="selector-container">
            <Selector
              title="Male"
              mutationList={mutationValuesMale}
              setMutationList={setMutationValuesMale}
            />
            <Selector
              title="Female"
              mutationList={mutationValuesFemale}
              setMutationList={setMutationValuesFemale}
            />
          </div>
          <Button
            className="firstButton"
            onClick={() =>
              makeF1Generation(mutationValuesMale, mutationValuesFemale)
            }
          >
            Make F1 Generation
          </Button>
        </>
      ) : (
        <div className="selector-container">
          <SelectedList title="Male" mutations={mutationValuesMale} />
          <SelectedList title="Female" mutations={mutationValuesFemale} />
        </div>
      )}
    </div>
  );
}
