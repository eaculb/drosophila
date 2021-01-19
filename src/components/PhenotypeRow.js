import React from "react";
import Table from "./Table";

import permutations from "../utils/permutations";

export default function PhenotypeRow({ title, traitOptions, ...props }) {
  const options = permutations(traitOptions);
  return (
    <div className="generation-results">
      <h5>{title}</h5>
      <Table options={options} {...props} />
    </div>
  );
}
