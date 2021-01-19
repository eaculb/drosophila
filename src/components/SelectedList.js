import React from "react";

export default function SelectedList({ title, mutations }) {
  return (
    <div className="mutation-form">
      <h4>{title}</h4>
      {Object.keys(mutations).length === 0 ? (
        <p className="wild-type-label">wild type</p>
      ) : (
        <>
          <p>{mutations.eyes} </p>
          <p>{mutations.body}</p>
          <p>{mutations.wings}</p>
          <p>{mutations.bristles}</p>
          <p>{mutations.antennae}</p>
          <p>{mutations.misc}</p>
        </>
      )}
    </div>
  );
}
