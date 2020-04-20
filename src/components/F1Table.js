import React from 'react';
import countPhenotypes from '../utils/countPhenotypes'

function ConditionButton({condition, onClick, children}){
  return(
    <button className={condition ? 'text-button border border-primary' : 'text-button unhighlighted'} onClick={onClick}>
      {children}
    </button>
  )
}

export default function F1Table({ trait, phenotypes, F1Male, F1Female, setF1Male, setF1Female }) {

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
            <ConditionButton condition={(F1Male === 'wild type')} onClick={() => setF1Male('wild type')}>
              {countPhenotypes(trait, phenotypes, false, false)}
            </ConditionButton>
          </td>
          <td>
            <ConditionButton condition={(F1Female === 'wild type')} onClick={() => setF1Female('wild type')}>
              {countPhenotypes(trait, phenotypes, false, true)}
            </ConditionButton>
          </td>
        </tr>
        {trait && (<tr>
          <th scope="row">{trait}</th>
          <td>
            <ConditionButton condition={(F1Male === trait)} onClick={() => setF1Male(trait)}>
              {countPhenotypes(trait, phenotypes, true, false)}
            </ConditionButton>
          </td>
          <td>
            <ConditionButton condition={(F1Female === trait)} onClick={() => setF1Female(trait)}>
              {countPhenotypes(trait, phenotypes, true, true)}
            </ConditionButton>
          </td>
        </tr>)}
      </tbody>
    </table>
  )
}