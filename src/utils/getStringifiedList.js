export default function getStringifiedList(list)  {
  let result = JSON.stringify(list).replace(/[[\]"]/g, '').replace(/,/g, ', ');
  return (result === '') ? 'wild type' : result;
}