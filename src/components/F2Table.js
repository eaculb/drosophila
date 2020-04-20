import React from 'react';
import countPhenotypes from '../utils/countPhenotypes'

export default function F2Table({ trait, phenotypes, F1Male, F1Female, setF1Male, setF1Female }) {
  return (
    <table className="table-bordered table-overrides">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">{'male'}</th>
          <th scope="col">{'female'}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">{'wild type'}</th>
          <td>
            {countPhenotypes(trait, phenotypes, false, false)}
          </td>
          <td>
            {countPhenotypes(trait, phenotypes, false, true)}
          </td>
        </tr>
        {trait && (<tr>
          <th scope="row">{trait}</th>
          <td>
            {countPhenotypes(trait, phenotypes, true, false)}
          </td>
          <td>
            {countPhenotypes(true, true)}
          </td>
        </tr>)}
      </tbody>
    </table>
  )
}