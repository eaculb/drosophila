import React from 'react';
import countPhenotypes from '../utils/countPhenotypes';
import getStringifiedList from '../utils/getStringifiedList';

export default function Table({ options, phenotypes }) {
  return (
    <table className="table-bordered table-overrides">
      <colgroup>
        <col className="w" />
        <col />
        <col />
      </colgroup>
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">{'male'}</th>
          <th scope="col">{'female'}</th>
        </tr>
      </thead>
      <tbody>
        {options.map((permutation, index) => (
          <tr key={index}>
            <th scope="row">{getStringifiedList(permutation)}</th>
            <td>{countPhenotypes(permutation, phenotypes)}</td>
            <td>{countPhenotypes(['female', ...permutation], phenotypes)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}