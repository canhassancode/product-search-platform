"use client";

import { useState, useMemo } from "react";
import { ColumnDef, useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { searchProducts } from "@/lib/search/search-engine";
import { Product } from "@/lib/types/product";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table";

interface DataTableProps {
  columns: ColumnDef<Product>[];
  data: Product[];
}

export function DataTable({ columns, data }: DataTableProps) {
  const [query] = useState("");

  // Use Fuse.js instead of TanStack's filtering
  const filteredData = useMemo(() => {
    return searchProducts(data, query, ["title", "description", "tags"]);
  }, [data, query]);

  // eslint-disable-next-line
  const table = useReactTable({
    data: filteredData.map((result) => result.item), // ← Use fuzzy-filtered data
    columns,
    getCoreRowModel: getCoreRowModel(),
    // Don't use getFilteredRowModel - we're doing it ourselves
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
