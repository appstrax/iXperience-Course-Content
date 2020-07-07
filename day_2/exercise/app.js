for (let i = 1; i < 6; i++) {
  console.log("Sheep Number " + i);
}

let people = [
  { name: "cam", age: "17", email: "sffsfgma@gmail.com" },
  { name: "jam", age: "24", email: "yodfs@gmail.com" },
  { name: "sam", age: "37", email: "yomasfaa@gmail.com" },
  { name: "wham", age: "127", email: "yofsfma@gmail.com" },
  { name: "bam", age: "7", email: "yomfasfaa@gmail.com" },
];

const names = people.map((person) => {
  return person.name;
});

console.log(names);

people.forEach((person) => {
  console.log(person.name);
});

function getNames(arr = []){
  arr = arr.map((i)=> {
    return i.name;
  })
  return arr
}

const names2 = getNames(people);
console.log(names2);
