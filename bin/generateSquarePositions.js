const fs = require('fs');

const objects = [];

const count = Math.floor(Math.random() * 181) + 20;

for (let i = 1; i <= count; i++) {
  const x = Math.floor(Math.random() * 1000) + 1;
  const y = Math.floor(Math.random() * 1000) + 1;
  const sizeIndex = Math.floor(Math.random() * 10);
  const size = Math.pow(2, sizeIndex);
  objects.push({
    id: i,
    x: x,
    y: y,
    width: size,
    height: size
  });
}

fs.writeFile('squarePositions.json', JSON.stringify(objects, null, 2), (err) => {
  if (err) throw err;
  console.log('File saved!');
});
