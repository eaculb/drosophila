export default function choose({ a, b }) {
  if (Math.random() < 0.5) {
    return a;
  } else {
    return b;
  }
}