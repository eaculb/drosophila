export default function permutations(array) {
  let prelimResult = array.reverse().reduce(
    (acc, cur) => {
      let next = [];
      for (var existing of acc) {
        next.push(existing)
        next.push([cur, ...existing])
      }
      return next;
    }, [[]])
  return prelimResult.sort((a, b) => {
    return a.length - b.length;
  });
}