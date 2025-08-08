
# 🧾 Proyecto Generador de Remitos para Dragonfish (sin OCR)

Este proyecto permite transformar remitos `.txt` en el formato correcto para ser cargados en el sistema **Dragonfish**, basándose en un diccionario de artículos. No se usa OCR, sino que se trabaja con remitos ya digitalizados como texto plano.

---

## 📁 Estructura de Carpetas

```
proyecto_remitos_final/
│
├── input/                # Aquí van los remitos en formato .txt a procesar
├── dragonfish/           # Resultado limpio para importar en Dragonfish
├── desconocidos/         # Líneas con errores o sin coincidencias
├── remitos_procesados/   # Remitos ya procesados (mueven desde input/)
│
├── generador.js          # Script principal para procesar los remitos
├── convertir.js          # Convierte un .txt plano a JSON de artículos
├── articulos_tav.json    # Diccionario generado (opcional)
├── articulos_taverniti.txt  # Archivo plano base para convertir
├── log_errores.txt       # Registro de errores durante ejecución
```

---

## ✅ Formato del archivo de entrada (`input/*.txt`)

```
Item    Cantidad
13450710.030   1
13450710.034   3
```

- Cada línea debe tener:
  - Código base (8 dígitos) + punto + talle (3 dígitos o letras)
  - Cantidad al final

---

## 👕 Conversión de talles soportados

| En el remito (.txt) | En Dragonfish |
|---------------------|---------------|
| .xs                 | $XS           |
| .s                  | $S            |
| .m                  | $M            |
| .l                  | $L            |
| .xl                 | $XL           |
| .xxl / .xxx         | $2XL / $3XL   |
| .4xl                | $4XL          |
| .000                | $0            |
| .028 – .060         | $28 – $60     (Jean)  
| .070 – .120         | $070 – $120   (Cinto)

---

## ⚙️ Cómo usar

### 1. Generar el archivo de artículos

1. Crear un archivo plano: `articulos_taverniti.txt`
2. Ejecutar:

```bash
node convertir.js
```

Esto genera el archivo `articulos_tav.json` que usará `generador.js`.

---

### 2. Procesar remitos

1. Colocar los `.txt` en la carpeta `input/`
2. Ejecutar:

```bash
node generador.js
```

Esto generará:
- Archivo limpio en `dragonfish/`
- Errores y líneas inválidas en `desconocidos/`
- Registro en `log_errores.txt` (si ocurre algo)
- Mueve el remito procesado a `remitos_procesados/`

---

### 2. Reprocesar remitos

1. Colocar los articulos desconocidos de cada remito de la carpeta desconocidos, dentro del json de articulos_tav.json
2. Ejecutar:

```bash
node reprocesar_desconocidos.js
```

Esto generará:
- Archivo completo en `dragonfish/`, con los que habian sido desconocidos sumados a su remito correspondientes
- Errores y líneas inválidas en `desconocidos/`
- Registro en `log_errores.txt` (si ocurre algo)
- Mueve el remito procesado a `remitos_procesados/`

---

## 🚨 Errores posibles

- `FORMATO_INVALIDO`: la línea no cumple el patrón esperado
- `NO_ENCONTRADO`: el código base no existe en `articulos_tav.json`

---

## 🧼 Recomendaciones

- Verificá que los archivos `.txt` no tengan encabezados innecesarios.
- Usá un editor como Notepad++ o VSCode para revisar saltos de línea.

---

## 🧑‍💻 Autor
Luis Haedo