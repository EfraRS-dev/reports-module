import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";

import type { ColumnDef, SortingState } from "@tanstack/react-table";

import "../styles/table.css";

function TablaReportes({ data }: { data: any[]}) {
    console.log(data);
  if (!data || data.length === 0) {
    return <p>No hay datos para mostrar</p>;
  }

  // generar columnas dinámicamente
  const columns: ColumnDef<any>[] = Object.keys(data[0]).map((key) => ({
    accessorKey: key,
    header: key.toUpperCase(),
    //cell: info => info.getValue(), // usa el valor original de la fila
  }));

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="tabla-container">
      <input
        className="filtro-input"
        value={globalFilter ?? ""}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="Buscar..."
      />

      <table className="tabla-reportes">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {{
                    asc: " 🔼",
                    desc: " 🔽",
                  }[header.column.getIsSorted() as string] ?? null}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => {
                console.log("DEBUG: cell", cell.getValue());
                return(
                <td key={cell.id}>
                    {/*JSON.stringify(cell.getValue())*/}
                    {/*flexRender(cell.column.columnDef.cell, cell.getContext())*/}
                    {String(cell.getValue())}
                </td>
              )}
                )
              }   
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablaReportes;