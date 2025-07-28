    # Proyecto Remitos 📦🧾

Este repositorio contiene dos proyectos Node.js independientes, orientados a la generación y procesamiento de remitos de forma automatizada.

## 📁 Estructura del Proyecto

Proyecto Remitos/
├── Remito_Pdf_Creator/
│ └── remito_pdf_creator/
└── Generador_De_Remitos/

yaml
Copiar
Editar

---

## 1. 🖨️ Remito PDF Creator

**Ubicación:** `Remito_Pdf_Creator/remito_pdf_creator/`

Este proyecto permite generar archivos PDF de remitos a partir de imágenes procesadas. Su objetivo es tomar imágenes (como remitos escaneados o fotografiados), reconocer los datos mediante **OCR (reconocimiento óptico de caracteres)** y generar un archivo PDF listo para archivo o impresión.

### 🔧 Instalación y uso

```bash
cd Remito_Pdf_Creator/remito_pdf_creator/
npm install
node remito_pdf_creator.js
🧠 Tecnologías y librerías utilizadas
tesseract.js: motor OCR para reconocimiento de texto en imágenes.

pdf-lib: para la generación y manipulación de archivos PDF.

fs, path: para manipulación de archivos y rutas locales.

2. 🔁 Generador de Remitos
Ubicación: Generador_De_Remitos/

Este proyecto permite la creación automática de remitos a partir de datos estructurados, como archivos JSON o listas predefinidas. Ideal para generar remitos en lote o desde una interfaz futura.

🔧 Instalación y uso
bash
Copiar
Editar
cd Generador_De_Remitos/
npm install
node generador_de_remitos.js
⚠️ Cambiar el nombre del archivo si tu entrypoint tiene otro nombre.

🧠 Tecnologías y librerías utilizadas
fs, pdf-lib, chalk u otras utilidades para generación de PDFs y manejo de datos.

📝 Consideraciones
Los directorios node_modules/ están ignorados por .gitignore y no se incluyen en el repositorio.

Las imágenes de entrada deben colocarse en el directorio procesados/ dentro del proyecto remito_pdf_creator.

Los archivos .env, logs y PDF generados no son necesarios en el repositorio y pueden ser ignorados también.

🛠️ Requisitos previos
Node.js v16 o superior

npm

🚧 Estado del proyecto
Ambos proyectos están en desarrollo activo y pueden cambiar en el tiempo. Su objetivo es agilizar el flujo de trabajo de carga y emisión de remitos en entornos comerciales o administrativos.

👤 Autor
Desarrollado por Luis Haedo

    # Proyecto Remitos 📦🧾

Este repositorio contiene dos proyectos Node.js independientes, orientados a la generación y procesamiento de remitos de forma automatizada.

## 📁 Estructura del Proyecto

Proyecto Remitos/
├── Remito_Pdf_Creator/
│ └── remito_pdf_creator/
└── Generador_De_Remitos/

yaml
Copiar
Editar

---

## 1. 🖨️ Remito PDF Creator

**Ubicación:** `Remito_Pdf_Creator/remito_pdf_creator/`

Este proyecto permite generar archivos PDF de remitos a partir de imágenes procesadas. Su objetivo es tomar imágenes (como remitos escaneados o fotografiados), reconocer los datos mediante **OCR (reconocimiento óptico de caracteres)** y generar un archivo PDF listo para archivo o impresión.

### 🔧 Instalación y uso

```bash
cd Remito_Pdf_Creator/remito_pdf_creator/
npm install
node remito_pdf_creator.js
🧠 Tecnologías y librerías utilizadas
tesseract.js: motor OCR para reconocimiento de texto en imágenes.

pdf-lib: para la generación y manipulación de archivos PDF.

fs, path: para manipulación de archivos y rutas locales.

2. 🔁 Generador de Remitos
Ubicación: Generador_De_Remitos/

Este proyecto permite la creación automática de remitos a partir de datos estructurados, como archivos JSON o listas predefinidas. Ideal para generar remitos en lote o desde una interfaz futura.

🔧 Instalación y uso
bash
Copiar
Editar
cd Generador_De_Remitos/
npm install
node generador_de_remitos.js
⚠️ Cambiar el nombre del archivo si tu entrypoint tiene otro nombre.

🧠 Tecnologías y librerías utilizadas
fs, pdf-lib, chalk u otras utilidades para generación de PDFs y manejo de datos.

📝 Consideraciones
Los directorios node_modules/ están ignorados por .gitignore y no se incluyen en el repositorio.

Las imágenes de entrada deben colocarse en el directorio procesados/ dentro del proyecto remito_pdf_creator.

Los archivos .env, logs y PDF generados no son necesarios en el repositorio y pueden ser ignorados también.

🛠️ Requisitos previos
Node.js v16 o superior

npm

🚧 Estado del proyecto
Ambos proyectos están en desarrollo activo y pueden cambiar en el tiempo. Su objetivo es agilizar el flujo de trabajo de carga y emisión de remitos en entornos comerciales o administrativos.

👤 Autor
Desarrollado por Luis Haedo