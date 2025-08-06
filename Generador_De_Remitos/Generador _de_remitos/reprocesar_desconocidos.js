const fs = require('fs');
const path = require('path');

// Leer artículos actualizados
let articulos = {};
try {
  articulos = JSON.parse(fs.readFileSync('articulos_tav.json', 'utf-8'));
} catch (err) {
  fs.writeFileSync('log_errores.txt', `❌ Error al leer articulos_tav.json:\n${err.message}`);
  console.error('❌ No se pudo leer articulos_tav.json');
  process.exit(1);
}

const dragonfishDir = path.join(__dirname, 'dragonfish');
const desconocidosDir = path.join(__dirname, 'desconocidos');
const logFile = path.join(__dirname, 'log_errores.txt');

// Obtener archivos de desconocidos
const desconocidosArchivos = fs.readdirSync(desconocidosDir).filter(f => f.endsWith('.txt'));

desconocidosArchivos.forEach(archivo => {
  const remitoNum = archivo.replace('_desconocidos.txt', '');
  const pathDesconocidos = path.join(desconocidosDir, archivo);
  const pathDragonfish = path.join(dragonfishDir, `${remitoNum}_dragonfish.txt`);

  const lineas = fs.readFileSync(pathDesconocidos, 'utf-8')
    .split('\n')
    .map(l => l.trim())
    .filter(Boolean);

  const nuevasLineas = [];
  const aunDesconocidos = [];

  lineas.forEach(linea => {
    const match = linea.match(/^NO_ENCONTRADO \((\d{8})\) → (\d{8})\.([a-zA-Z0-9]+)\s+(\d+)$/i);
    if (!match) {
      aunDesconocidos.push(linea);
      return;
    }

    const [_, codigoBase, codigoOtraVez, talleRaw, cantidad] = match;

    if (!articulos[codigoBase]) {
      aunDesconocidos.push(linea);
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
        talle = talle.slice(-2); // por ejemplo, "030" => "30"
      }
    }

    const lineaFinal = `${cantidad}+${articuloFinal.toLowerCase()}$${talle}`;
    nuevasLineas.push(lineaFinal);
  });

  // Agregar las líneas nuevas al dragonfish correspondiente
  if (nuevasLineas.length > 0) {
    fs.appendFileSync(pathDragonfish, '\n' + nuevasLineas.join('\n'));
    console.log(`♻️  ${archivo}: ${nuevasLineas.length} líneas recuperadas`);
  }

  // Reescribir el archivo con los que siguen sin poder resolverse
  fs.writeFileSync(pathDesconocidos, aunDesconocidos.join('\n'));

  if (aunDesconocidos.length > 0) {
    console.log(`⚠️  ${archivo}: ${aunDesconocidos.length} líneas aún no reconocidas`);
  } else {
    console.log(`✅ ${archivo}: todas las líneas fueron recuperadas`);
  }
});
