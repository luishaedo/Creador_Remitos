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

// Leer configuración de especiales (si no existe, queda vacío)
let especiales = {};
try {
  if (fs.existsSync('especiales.json')) {
    especiales = JSON.parse(fs.readFileSync('especiales.json', 'utf-8'));
  }
} catch (err) {
  fs.appendFileSync('log_errores.txt', `⚠️ No se pudo leer especiales.json:\n${err.message}\n`);
}

// Leer configuración de packs (si no existe, queda vacío)
let packs = {};
try {
  if (fs.existsSync('packs.json')) {
    packs = JSON.parse(fs.readFileSync('packs.json', 'utf-8'));
  }
} catch (err) {
  fs.appendFileSync('log_errores.txt', `⚠️ No se pudo leer packs.json:\n${err.message}\n`);
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

      const [_, codigoBase, talleRaw, cantidadStr] = match;
      const cantidad = parseInt(cantidadStr, 10);

      // ---------- LÓGICA DE PACKS ----------
      if (packs[codigoBase]) {
        const reglaPack = packs[codigoBase];
        const factor = Number(reglaPack.factor) || 1;
        const unidades = cantidad * factor;

        // SKU: usar override si viene; si no, buscar en articulos_tav
        let skuDesdeConfig = (reglaPack.sku || '').trim();
        let skuElegida = skuDesdeConfig
          ? skuDesdeConfig
          : articulos[codigoBase];

        if (!skuElegida) {
          desconocidos.push(`PACK_SIN_SKU (${codigoBase}) → No hay 'sku' en packs.json ni en articulos_tav.json`);
          return;
        }

        // Talle: usar el del pack (o "U"/"0" si no viene)
        let tallePack = (reglaPack.talle || 'U').toString().toUpperCase().replace(/[^A-Z0-9]/g, '');
        if (tallePack === '000') tallePack = '0';

        const lineaFinalPack = `${unidades}+${skuElegida.toLowerCase()}$${tallePack}`;
        salida.push(lineaFinalPack);
        return; // Importante: no seguir a lógica de especiales si es pack
      }

      // ---------- LÓGICA NORMAL (NO PACK) ----------
      if (!articulos[codigoBase]) {
        desconocidos.push(`NO_ENCONTRADO (${codigoBase}) → ${linea}`);
        return;
      }

      let articuloFinalBase = articulos[codigoBase]; // p.ej. "thj01428205"
      let talle = talleRaw.toUpperCase().replace(/[^A-Z0-9]/g, '');

      // Normalización de talles
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
          talle = talle.slice(-2); // Jean: 028 -> "28", 030 -> "30", etc.
        }
      }

      // Decidir si corresponde SKU "especial" (solo si talle numérico como 40, 42, etc.)
      let skuElegida = articuloFinalBase;
      const esJeanNumerico = /^\d{2}$/.test(talle); // "28", "30", "40", etc.
      if (esJeanNumerico && especiales[codigoBase]) {
        const reglaEsp = especiales[codigoBase];
        const desde = Number(reglaEsp.desde) || 40;
        const sufijo = (reglaEsp.sufijo || 'E').toString();
        const talleNum = parseInt(talle, 10);

        if (!Number.isNaN(talleNum) && talleNum >= desde) {
          skuElegida = `${articuloFinalBase}${sufijo}`;
        }
      }

      // Generar línea final (NO pack → la cantidad es la original)
      const lineaFinal = `${cantidad}+${skuElegida.toLowerCase()}$${talle}`;
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
