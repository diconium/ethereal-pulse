import React from 'react';

interface DataTableProps {
  columns: string[];
  data: unknown[];
  isLoading: boolean;
  noDataText: string;
  renderRow: (item: unknown) => JSX.Element;
}

const DataTable: React.FC<DataTableProps> = ({
  columns,
  data,
  isLoading,
  noDataText,
  renderRow,
}) => {
  return (
    <section className="max-h-[calc(100vh-250px)] overflow-y-auto">
      <table className="table-fixed w-full">
        <thead className="bg-gray-100 border-b-2 sticky top-0">
          <tr>
            {columns.map((column, index) => (
              <th key={index} className="text-left p-3">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td className="px-3" colSpan={columns.length}>
                Loading...
              </td>
            </tr>
          ) : data.length ? (
            data.map(renderRow)
          ) : (
            <tr>
              <td className="px-3" colSpan={columns.length}>
                {noDataText}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
};

export default DataTable;
