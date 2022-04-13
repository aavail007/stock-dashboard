import React from 'react';
import 'tw-elements';
import type { RowsType, ColumnsType } from 'types/utils/tableType';
type PropsType = {
  rows: RowsType[];
  columns: ColumnsType[];
  height?: string;
};

const Table: React.FC<PropsType> = ({ rows, columns, height }) => {
  return (
    <>
      <div className={`flex flex-col xl:h-[500px] bg-white rounded-xl shadow-xl`}>
        <div className="overflow-auto">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <table className="min-w-full">
              <thead className="border-b-2">
                <tr>
                  {columns.map((item) => {
                    return (
                      <th
                        scope="col"
                        className="text-sm font-bold bg-white text-fourth px-6 py-4 text-left sticky top-0"
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
                            className="px-6 py-4 text-sm font-medium text-gray-900"
                            key={tdItem.key}>
                            {tdItem.link && (
                              <a
                                href={tdItem.link}
                                className="text-sGreen hover:underline underline-offset-1"
                                target="_blank"
                                rel="noreferrer">
                                {tdItem.value}
                              </a>
                            )}

                            {!tdItem.link && <span>{tdItem.value}</span>}
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
    </>
  );
};

export default Table;
