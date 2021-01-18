import React from "react";

export default function SelectedList({ title, mutations }) {
  return (
    <div className="mutation-form m-1 p-2">
      <h4>{title}</h4>
      {Object.keys(mutations).length === 0 ? (
        <p className="wild-type">wild type</p>
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
