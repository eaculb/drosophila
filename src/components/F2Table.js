import React from 'react';
import countPhenotypes from '../utils/countPhenotypes'

export default function F2Table({ trait, phenotypes }) {
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
          <td className="text-button unhighlighted">
            {countPhenotypes(trait, phenotypes, false, false)}
          </td>
          <td className="text-button unhighlighted">
            {countPhenotypes(trait, phenotypes, false, true)}
          </td>
        </tr>
        {trait && (<tr>
          <th scope="row">{trait}</th>
          <td className="text-button unhighlighted">
            {countPhenotypes(trait, phenotypes, true, false)}
          </td>
          <td className="text-button unhighlighted">
            {countPhenotypes(trait, phenotypes, true, true)}
          </td >
        </tr>)}
      </tbody>
    </table>
  )
}