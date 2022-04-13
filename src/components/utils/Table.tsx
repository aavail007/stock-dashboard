import React from 'react';
import 'tw-elements';
import type { RowsType, ColumnsType } from 'types/utils/tableType';
type PropsType = {
  rows: RowsType[];
  columns: ColumnsType[];
  height: string;
};

const Table: React.FC<PropsType> = ({ rows, columns, height }) => {
  return (
    <>
      <div className={`flex flex-col xl:h-[${height}] overflow-auto bg-white rounded-xl shadow-xl`}>
        <div className="overflow-x-auto">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="border-b sticky top-0">
                  <tr>
                    {columns.map((item) => {
                      return (
                        <th
                          scope="col"
                          className="text-sm font-bold text-fourth px-6 py-4 text-left"
                          key={item.key}>
                          {item.value}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((item) => {
                    return (
                      <tr className="border-b" key={item.id}>
                        {item.data.map((tdItem) => {
                          return (
                            <td
                              className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                              key={tdItem.key}>
                              {tdItem.value}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;
