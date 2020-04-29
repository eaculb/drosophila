export default function Genotype(female){
  this[1] = { a: {}, b: {} }
  this[2] = { a: {}, b: {} }
  this[3] = { a: {}, b: {} }
  this.X = { a: {}, b: female ? {} : false }
}