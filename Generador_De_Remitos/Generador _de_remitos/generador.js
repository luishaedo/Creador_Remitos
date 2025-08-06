
const fs = require('fs');
const path = require('path');

// Leer artículos válidos
let articulos = {};
try {
  articulos = JSON.parse(fs.readFileSync('articulos_tav.json', 'utf-8'));
} catch (err) {
  fs.writeFileSync('log_errores.txt', `❌ Error al leer articulos_tav.json:\n${err.message}`);
  console.error('❌ No se pudo leer articulos_tav.json');
  process.exit(1);
}

const inputDir = path.join(__dirname, 'input');
const dragonfishDir = path.join(__dirname, 'dragonfish');
const desconocidosDir = path.join(__dirname, 'desconocidos');
const procesadosDir = path.join(__dirname, 'remitos_procesados');
const logFile = path.join(__dirname, 'log_errores.txt');

[dragonfishDir, desconocidosDir, procesadosDir].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
});

const archivos = fs.readdirSync(inputDir).filter(f => f.endsWith('.txt'));

archivos.forEach(archivo => {
  try {
    const inputPath = path.join(inputDir, archivo);
    const remitoNum = archivo.replace('.txt', '');
    const lineas = fs.readFileSync(inputPath, 'utf-8')
      .split('\n')
      .map(l => l.trim())
      .filter(Boolean)
      .filter(l => !l.toLowerCase().startsWith('item'));

    const salida = [];
    const desconocidos = [];

    lineas.forEach(linea => {
      const match = linea.match(/^(\d{8})\.([a-zA-Z0-9]+)\s+(\d+)$/i);
      if (!match) {
        desconocidos.push(`FORMATO_INVALIDO → ${linea}`);
        return;
      }

      const [_, codigoBase, talleRaw, cantidad] = match;

      if (!articulos[codigoBase]) {
        desconocidos.push(`NO_ENCONTRADO (${codigoBase}) → ${linea}`);
        return;
      }

      const articuloFinal = articulos[codigoBase];
      let talle = talleRaw.toUpperCase().replace(/[^A-Z0-9]/g, '');

      if (talle === "XXXL" || talle === "XXX") talle = "3XL";
      else if (talle === "XXL") talle = "2XL";
      else if (talle === "XL") talle = "XL";
      else if (talle === "L") talle = "L";
      else if (talle === "M") talle = "M";
      else if (talle === "S") talle = "S";
      else if (talle === "XS") talle = "XS";
      else if (talle === "4XL") talle = "4XL";
      else if (talle === "000") talle = "0";
      else if (/^\d{3}$/.test(talle)) {
        const talleNum = parseInt(talle, 10);
        if (talleNum <= 60) {
          talle = talle.slice(-2); // Jean
        }
      }

      const lineaFinal = `${cantidad}+${articuloFinal.toLowerCase()}$${talle}`;
      salida.push(lineaFinal);
    });

    fs.writeFileSync(path.join(dragonfishDir, `${remitoNum}_dragonfish.txt`), salida.join('\n'));
    fs.writeFileSync(path.join(desconocidosDir, `${remitoNum}_desconocidos.txt`), desconocidos.join('\n'));

    fs.renameSync(inputPath, path.join(procesadosDir, archivo));

    console.log(`✅ Procesado ${archivo}: ${salida.length} válidos, ${desconocidos.length} errores.`);
  } catch (err) {
    fs.appendFileSync(logFile, `❌ Error procesando ${archivo}: ${err.message}\n`);
    console.error(`❌ Error procesando ${archivo}:`, err.message);
  }
});
