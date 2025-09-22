import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { HiArrowsUpDown } from "react-icons/hi2";
import { FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { PiLinkBold } from "react-icons/pi";
import {
  DailyProjectData,
  WeeklyProjectData,
} from "../../../../../../components/Data";

const MonthlyProjects = () => {
  const navigate = useNavigate();
  const [expandedRow, setExpandedRow] = useState(false);
  const toggleRow = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  return (
    <div className="font-roboto-flex flex flex-col h-full">
      <div className="mt-4 overflow-y-auto no-scrollbar ">
        <div className="overflow-auto no-scrollbar">
          <table className="w-full whitespace-nowrap">
            <thead>
              <tr className="font-semibold  text-sm bg-white border-b-4 border-light-blue">
                <th className="p-3.5 rounded-l-lg">S.no</th>
                {["Description", "Quantity ", "Units "].map((heading) => (
                  <th key={heading} className="p-3">
                    <h1 className="flex items-center justify-center  gap-2">
                      {heading} <HiArrowsUpDown size={18} />
                    </h1>
                  </th>
                ))}

                <th>22 Mon</th>
                <th>23 Tue</th>
                <th>24 Wed</th>
                <th> 25 Thur</th>
                <th>26 Fri</th>
                <th>27 Sat</th>
                <th className="pr-2 rounded-r-lg">Action</th>
              </tr>
            </thead>

            <tbody className="text-greyish  text-sm font-light">
              {WeeklyProjectData.length > 0
                ? WeeklyProjectData.map((data, index) => {
                    return (
                      <React.Fragment key={index}>
                        <tr className="border-b-[3px]  bg-white border-light-blue text-center">
                          <td className="rounded-l-lg py-3 ">{index + 1}</td>
                          <td className="">{data.description}</td>
                          <td></td>
                          <td></td>
                          <td className="px-2">
                            <p className="flex items-center gap-2">
                              Planned <span>Acheived</span>
                            </p>
                          </td>
                          <td className="px-2">
                            <p className="flex items-center gap-2">
                              Planned <span>Acheived</span>
                            </p>
                          </td>
                          <td className="px-2">
                            <p className="flex items-center gap-2">
                              Planned <span>Acheived</span>
                            </p>
                          </td>
                          <td className="px-2">
                            <p className="flex items-center gap-2">
                              Planned <span>Acheived</span>
                            </p>
                          </td>
                          <td className="px-2">
                            <p className="flex items-center gap-2">
                              Planned <span>Acheived</span>
                            </p>
                          </td>
                          <td className="px-2">
                            <p className="flex items-center gap-2">
                              Planned <span>Acheived</span>
                            </p>
                          </td>

                          <td className="rounded-r-lg flex items-center justify-center gap-2 mt-2 px-4">
                            <p className="cursor-pointer bg-green-200  rounded-sm  p-1.5  text-green-600">
                              <FiEye />
                            </p>
                            {/* <p
                             
                              
                              className="cursor-pointer bg-cyan-200 p-1.5  rounded  text-cyan-700"
                            >
                              <PiLinkBold />
                            </p> */}
                            <p
                              onClick={() => toggleRow(index)}
                              className="cursor-pointer bg-blue-200  rounded p-0.5 text-blue-600"
                            >
                              {expandedRow === index ? (
                                <ChevronUp />
                              ) : (
                                <ChevronDown />
                              )}
                            </p>
                          </td>
                        </tr>

                        {expandedRow === index && (
                          <tr>
                            <td colSpan="12" className="px-6 py-1">
                              <div className="bg-white px-4 py-2 rounded-md">
                                <table className="w-full text-sm table-fixed">
                                  <tbody>
                                    {data.details.map((detail, i) => (
                                      <tr
                                        key={i}
                                        className="bg-gray-200 border-b border-white text-center"
                                      >
                                        {/* Description */}
                                        <td className="text-start pl-4 py-1 font-medium whitespace-nowrap">
                                          {String.fromCharCode(97 + i)}){" "}
                                          {detail.contractor}
                                        </td>

                                        {/* Quantity */}
                                        <td className="py-1">
                                          {detail.quantity}
                                        </td>

                                        {/* Units */}
                                        <td className="py-1">{detail.unit}</td>

                                        {/* Dates: 22 Mon to 27 Sat */}
                                        {[...Array(6)].map((_, idx) => (
                                          <td key={idx} className="py-1">
                                            <p className="flex justify-center gap-1">
                                              <span>{detail.planned}</span>
                                              <span>{detail.acheived}</span>
                                            </p>
                                          </td>
                                        ))}

                                        {/* Action column (empty for alignment) */}
                                        <td className="py-1"></td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })
                : ""}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MonthlyProjects;
