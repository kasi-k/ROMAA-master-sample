import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { HiArrowsUpDown } from "react-icons/hi2";
import { FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { WeeklyProjectData } from "../../../../../../components/Data";

const DAYS = [
  { label: "22", sub: "Mon" },
  { label: "23", sub: "Tue" },
  { label: "24", sub: "Wed" },
  { label: "25", sub: "Thu" },
  { label: "26", sub: "Fri" },
  { label: "27", sub: "Sat" },
];

const WeeklyProjects = () => {
  const navigate = useNavigate();
  const [expandedRow, setExpandedRow] = useState(null);

  const toggleRow = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  return (
    <div className="font-roboto-flex flex flex-col h-full">
      <div className="mt-4 overflow-y-auto no-scrollbar">
        <div className="overflow-auto no-scrollbar">
          <table className="w-full whitespace-nowrap text-center">
            <thead>
              <tr className="font-semibold text-sm bg-white border-b-4 border-light-blue">
                <th className="p-3.5 rounded-l-lg">S.no</th>
                <th className="p-3">
                  <span className="flex items-center justify-center gap-2">
                    Description <HiArrowsUpDown size={18} />
                  </span>
                </th>
                <th className="p-3">
                  <span className="flex items-center justify-center gap-2">
                    Quantity <HiArrowsUpDown size={18} />
                  </span>
                </th>
                <th className="p-3">
                  <span className="flex items-center justify-center gap-2">
                    Units <HiArrowsUpDown size={18} />
                  </span>
                </th>
                {DAYS.map((d) => (
                  <th key={d.label} className="p-2">
                    <div className="flex flex-col leading-3">
                      <span>{d.label}</span>
                      <span className="text-xs">{d.sub}</span>
                    </div>
                  </th>
                ))}
                <th className="pr-2 rounded-r-lg">Action</th>
              </tr>
            </thead>
            <tbody className="text-greyish text-sm font-light">
              {WeeklyProjectData.length > 0 &&
                WeeklyProjectData.map((data, index) => (
                  <React.Fragment key={index}>
                    {/* MAIN ROW */}
                    <tr className="border-b-[3px] bg-white border-light-blue text-center group">
                      <td className="rounded-l-lg py-3">{index + 1}</td>
                      <td className="text-center font-medium">
                        {data.description}
                      </td>
                      <td className="text-center font-medium"></td>
                      <td className="text-center font-medium"></td>
                      {DAYS.map((_, idx) => (
                        <td key={idx} className="px-2">
                          <div className="flex  gap-0.5">
                            <span className="text-xs text-gray-400">
                              Planned
                            </span>
                            <span className="text-xs text-gray-400">
                              Achieved
                            </span>
                          </div>
                        </td>
                      ))}
                      <td className="rounded-r-lg">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            className="cursor-pointer bg-green-200 rounded-sm p-1.5 text-green-600"
                            onClick={() => {
                              navigate("/projects/projectschedule/viewweekly", {
                                state: { item: data },
                              });
                            }}
                          >
                            <FiEye />
                          </button>
                          <button
                            onClick={() => toggleRow(index)}
                            className="cursor-pointer bg-blue-200 rounded p-0.5 text-blue-600"
                            aria-label="Expand row"
                          >
                            {expandedRow === index ? (
                              <ChevronUp />
                            ) : (
                              <ChevronDown />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* EXPANDED SUBROW */}
                    {expandedRow === index && (
                      <tr>
                        <td colSpan={13} className="px-6 py-2 bg-blue-50">
                          <div className="bg-gray-100 rounded-lg px-3 py-2">
                            <table className="w-full table-fixed text-center">
                              <thead>
                                <tr>
                                  <th className="w-1/5 text-left pl-2"></th>
                                  <th className="w-1/12">QTY</th>
                                  <th className="w-1/12">Units</th>
                                  {DAYS.map((d, i) => (
                                    <th key={i} className="w-1/12">
                                      {d.label}{" "}
                                      <span className="block text-xs">
                                        {d.sub}
                                      </span>
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {data.details.map((detail, dIdx) => (
                                  <React.Fragment key={dIdx}>
                                    {/* Row for Planned */}
                                    <tr className="bg-gray-200 border-b border-white">
                                      <td className="py-1 font-medium text-left pl-2">
                                        {String.fromCharCode(97 + dIdx)}){" "}
                                        {detail.contractor}
                                      </td>
                                      <td className="py-1">
                                        {detail.quantity}
                                      </td>
                                      <td className="py-1">{detail.unit}</td>
                                      {detail.daily.map((day, dayIdx) => (
                                        <td key={dayIdx} className="py-1">
                                          <span className="block font-medium text-gray-600">
                                            Planned
                                          </span>
                                          <span className="block">
                                            {day.planned
                                              .toString()
                                              .padStart(2, "0")}
                                          </span>
                                        </td>
                                      ))}
                                    </tr>
                                    {/* Row for Achieved */}
                                    <tr className="bg-gray-200 border-b border-white">
                                      <td className="py-1 font-medium text-left pl-8"></td>
                                      <td className="py-1"></td>
                                      <td className="py-1"></td>
                                      {detail.daily.map((day, dayIdx) => (
                                        <td key={dayIdx} className="py-1">
                                          <span className="block font-medium text-blue-700">
                                            Achieved
                                          </span>
                                          <span className="block">
                                            {day.achieved
                                              .toString()
                                              .padStart(2, "0")}
                                          </span>
                                        </td>
                                      ))}
                                    </tr>
                                  </React.Fragment>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WeeklyProjects;
