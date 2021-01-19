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
  return (
    <div className="step">
      <StepTitle step="1" title="Select P0 Phenotypes" />
      <div className="selector-container">
        {active ? (
          <>
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
          </>
        ) : (
          <>
            <SelectedList title="Male" mutations={mutationValuesMale} />
            <SelectedList title="Female" mutations={mutationValuesFemale} />
          </>
        )}
      </div>
      {active && (
        <Button
          className="mutation-form-submit"
          onClick={() =>
            makeF1Generation(mutationValuesMale, mutationValuesFemale)
          }
        >
          Make F1 Generation
        </Button>
      )}
    </div>
  );
}
