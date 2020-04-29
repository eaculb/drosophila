export default function match(arrA, arrB) {
  if (!(arrA && arrB && arrA.length === arrB.length)) {
    return false;
  }
  for (let elem of arrA){
    if (arrB.indexOf(elem) < 0) {
      return false;
    }
    for (let elem of arrB){
      if (arrA.indexOf(elem) < 0) {
        return false;
      }
    }
  }
  return true;
}