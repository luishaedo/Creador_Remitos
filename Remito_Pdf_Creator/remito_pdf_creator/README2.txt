📄 INSTRUCCIONES PARA FLUJO DIARIO DE PROCESAMIENTO DE REMITOS

✅ ¿QUÉ HACER CADA DÍA?

1. Colocar las imágenes del remito en la carpeta: remitos_hoy
2. Ejecutar el script con:
   npm start
3. El script:
   - Crea un PDF llamado: remitos_DD-MM-YYYY.pdf
   - Mueve las imágenes a la carpeta "procesados"
   - Abre automáticamente https://askyourpdf.com/upload

4. Subir el PDF generado en esa página
5. Copiar el doc_id que aparece tras la subida
6. Volver a este chat y pegar aquí el doc_id

📌 ENLACE A ESTE CHAT: (pegalo desde tu navegador actual de ChatGPT)

🔁 ¿QUÉ PASA DESPUÉS?

- El sistema detecta automáticamente:
  - Número de remito (formato: Rto: XXXX-XXXXXXXX)
  - Columnas "Item" y "Cantidad"
- Se genera un archivo .txt por remito o por página
- El nombre del archivo será el número de remito
  Ejemplos:
    0061-00135440.txt
    0061-00135440_B.txt
    0061-00135440_C.txt

📄 FORMATO DEL ARCHIVO .TXT:
Item	Cantidad
11823206.014	2
13450710.030	1
...

🧠 CONSEJO:
- Guardar este archivo como referencia diaria
- Favorito este chat en tu navegador
- Siempre usar este mismo hilo para que el sistema recuerde todo

