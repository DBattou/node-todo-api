var originItem = [{
  name: 'Baptiste',
  age: 28,
}, {
  name: 'Toutou',
  age: 32
}];

const [{ name: name1 }, { name: name2 }] = originItem;
console.log([{ name1 }, { name2 }]);