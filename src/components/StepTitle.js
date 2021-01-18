import React from "react";

export default function StepTitle({ step, title }) {
  return <h3>{`Step ${step}: ${title}`}</h3>;
}
