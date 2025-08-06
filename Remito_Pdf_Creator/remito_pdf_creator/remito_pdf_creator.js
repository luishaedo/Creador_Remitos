// Requiere: npm install pdfkit fs-extra image-size open
const fs = require('fs-extra');
const path = require('path');
const PDFDocument = require('pdfkit');
const sizeOf = require('image-size');
const errorLog = 'error_log.txt';

const carpetaImagenes = 'remitos_hoy';
const carpetaProcesados = 'procesados';
const hoy = new Date();
const nombreArchivo = `remitos_${hoy.toLocaleDateString('es-AR').replace(/\//g, '-')}.pdf`;

(async () => {
  try {
    const open = (await import('open')).default;

    await fs.ensureDir(carpetaImagenes);
    await fs.ensureDir(carpetaProcesados);

    const doc = new PDFDocument({ autoFirstPage: false });
    const salida = fs.createWriteStream(nombreArchivo);
    doc.pipe(salida);

    const imagenes = (await fs.readdir(carpetaImagenes))
      .filter(f => f.toLowerCase().match(/\.(jpg|jpeg|png)$/))
      .sort();

    for (const nombre of imagenes) {
      const ruta = path.join(carpetaImagenes, nombre);
      const { width, height } = sizeOf(ruta);
      doc.addPage({ size: [width, height] });
      doc.image(ruta, 0, 0, { width, height });

      const destino = path.join(carpetaProcesados, nombre);
      await fs.move(ruta, destino, { overwrite: true });
    }

    doc.end();
    salida.on('finish', () => {
      console.log(`✅ PDF generado: ${nombreArchivo}`);
      open('https://askyourpdf.com/upload');
    });

  } catch (err) {
    console.error('❌ Error durante la ejecución:', err);
    const logMsg = `[${new Date().toLocaleString()}] Error: ${err.message}\n`;
    await fs.appendFile(errorLog, logMsg);
  }
})();