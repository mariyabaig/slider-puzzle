/*This function is like a game setup. It creates a 3x3 puzzle (imagine a grid with 3 rows and 3 columns) with numbers from 0 to 8, arranged randomly. The goal is to make a shuffled puzzle for you to solve.*/
export const getShuffledPuzzle = () => {
  const values = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  const rowOne = [],
    rowTwo = [],
    rowThree = [];

  while (values.length) {
    const random = Math.floor(Math.random() * values.length)

    if (rowOne.length < 3) {
      rowOne.push(values.splice(random, 1)[0])
    } else if (rowTwo.length < 3) {
      rowTwo.push(values.splice(random, 1)[0])
    } else {
      rowThree.push(values.splice(random, 1)[0])
    }

   
  }

  return [rowOne, rowTwo, rowThree]
}

/*It takes the 3x3 puzzle and turns it into a straight line of numbers. This helps in checking how many numbers are out of order.*/
export const flattenArray = (arr) => {
  return arr.reduce((flatArr, subArr) => flatArr.concat(subArr), [])
}
/*to figure out how many times a smaller number is placed before a bigger number.*/
export const getInversionsCount = (arr) => {
  arr = flattenArray(arr).filter((n) => n !== 0)

  const inversions = [];

  for (let i = 0; i < arr.length - 1; i++) {
    const currentValue = arr[i];
    const currentInversions = arr.filter(
      (val, j) => i < j && val < currentValue
    )
    inversions.push(currentInversions.length)
  }

  const inversionsCount = inversions.reduce((total, val) => total + val, 0)

  return inversionsCount;
}
/*This function uses the information from the previous one. It checks if the puzzle is set up in a way that makes it solvable. If it's solvable, it means you can solve the puzzle by moving the numbers around.*/
export const isSolvable = (puzzle) => {
  return getInversionsCount(puzzle) % 2 === 0;
}
