export const getRounded = (num: number | string) => {
  let parsedNum : number;
  if (typeof (num) === 'string') {
    parsedNum = parseFloat(num);
  } else {
    parsedNum = num;
  }

  if (Math.floor(parsedNum).toString().length < 2) {
    parsedNum = Math.round(parsedNum * 100) / 100;
  } else {
    parsedNum = Math.round(parsedNum * 10) / 10;
  }

  return parsedNum;
};
