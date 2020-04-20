export default function Genotype(male = false){
  this[1] = { a: {}, b: {} }
  this[2] = { a: {}, b: {} }
  this[3] = { a: {}, b: {} }
  this.X = { a: {}, b: male ? false : {} }
}