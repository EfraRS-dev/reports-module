# Módulo de reportes

## Ejecutar el backend

```bash
cd backend
npm i
npx prisma generate
npm run start:dev
```

## Ejecutar el frontend

```bash
cd frontend
npm i
npm run dev
```

## Patrones de diseño implementados

### Facade (Frontend)

El patrón **Facade** se implementa en el frontend a través del componente `chartFacade.tsx`. Este patrón proporciona una interfaz simplificada para trabajar con diferentes tipos de gráficos (barras, líneas, pastel, _sparkline_), ocultando la complejidad de la implementación específica de cada gráfico y ofreciendo una interfaz unificada para su uso.

### Builder (Backend)

El patrón **Builder** se utiliza en el backend para construir reportes de manera flexible. Se encuentra implementado en:

- `director.ts`: Director que coordina el proceso de construcción
- `productReportBuilder.ts`: Constructor específico para reportes de productos
- `userReportBuilder.ts`: Constructor específico para reportes de usuarios
- `interfaz.ts`: Define la interfaz común para los builders

Este patrón permite crear diferentes tipos de reportes paso a paso, manteniendo el código flexible y extensible.

### Template Method (Backend)

El patrón **Template Method** se implementa en el sistema de exportación de reportes ubicado en `src/report/exporters/`. El archivo `report-exporter.template.ts` define el algoritmo base para exportar reportes, mientras que `excel-exporter.ts` y `pdf-exporter.ts` implementan los pasos específicos para cada formato de exportación, permitiendo reutilizar la lógica común y personalizar la función.
