function isPowerOfTwo(n) {
  if (n === 1) {
    return true;
  }
  let crt = n;
  while (crt % 2 === 0 && crt !== 0) {
    crt /= 2;
    if (crt === 1) {
      return true;
    }
  } return false;
} 



console.log(isPowerOfTwo(2))//, true));
console.log(isPowerOfTwo(4194304)) //, true)
console.log(isPowerOfTwo(5))//, false)