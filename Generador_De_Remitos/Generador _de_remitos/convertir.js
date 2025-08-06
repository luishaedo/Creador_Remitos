
const fs = require('fs');

const data = fs.readFileSync('articulos_taverniti.txt', 'utf8');
const lineas = data.split('\n');

const articulos = {};

lineas.forEach(linea => {
  const codigoCompleto = linea.trim().toUpperCase();
  const match = codigoCompleto.match(/(\d{8})$/);

  if (match) {
    const codigoBase = match[1];
    articulos[codigoBase] = codigoCompleto;
  } else {
    console.warn(`⚠️ No se pudo extraer código de: "${codigoCompleto}"`);
  }
});

fs.writeFileSync('articulos_tav.json', JSON.stringify(articulos, null, 2));
console.log('✅ articulos_tav.json generado.');
