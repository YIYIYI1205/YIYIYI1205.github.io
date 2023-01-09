const string = '3x33xy123'
const reg = /x|y/
console.log(string.match(reg))
console.log(reg.test(string))
console.log(reg.exec(string))



const regex1 = RegExp('foo*', 'g');
const str1 = 'table football, foosball';
let array1;

while ((array1 = regex1.exec(str1)) !== null) {
  console.log(`Found ${array1[0]}. Next starts at ${regex1.lastIndex}.`);
  // expected output: "Found foo. Next starts at 9."
  // expected output: "Found foo. Next starts at 19."
}

const string1 = 'nafndmcsndn'
const reg1 = /.n/
console.log(reg1.exec(string1))
