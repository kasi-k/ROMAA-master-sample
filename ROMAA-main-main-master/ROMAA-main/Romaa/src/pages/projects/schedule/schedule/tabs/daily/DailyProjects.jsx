import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { HiArrowsUpDown } from "react-icons/hi2";
import { FiEye } from "react-icons/fi";
import {useNavigate } from "react-router-dom";

import { DailyProjectData } from "../../../../../../components/Data";

const DailyProjects = () => {
  const navigate = useNavigate();
  const [expandedRow, setExpandedRow] = useState(null);

  const toggleRow = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  return (
    <div className="font-roboto-flex flex flex-col h-full">
      <div className="mt-4 overflow-y-auto no-scrollbar">
        <div className="overflow-auto no-scrollbar">
          <table className="w-full whitespace-nowrap">
            <thead>
              <tr className="font-semibold text-sm bg-white border-b-4 border-light-blue">
                <th className="p-3.5 rounded-l-lg">S.no</th>
                {[
                  "Description",
                  "Quantity ",
                  "Unit ",
                  "Man Power",
                  " Start Date",
                  "Days Remaining",
                  "Status",
                ].map((heading) => (
                  <th key={heading} className="p-3">
                    <h1 className="flex items-center justify-center gap-2">
                      {heading}
                      <HiArrowsUpDown size={18} />
                    </h1>
                  </th>
                ))}
                <th className="pr-2 rounded-r-lg">Action</th>
              </tr>
            </thead>

            <tbody className="text-greyish text-sm font-light">
              {DailyProjectData?.length > 0
                ? DailyProjectData.map((data, index) => (
                    <React.Fragment key={index}>
                      <tr className="border-b-[3px] bg-white border-light-blue text-center">
                        <td className="rounded-l-lg py-3">{index + 1}</td>
                        <td>{data.description}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td className="rounded-r-lg flex items-center justify-center gap-2 mt-2">
                          <p
                            onClick={() =>
                              navigate(
                                "/projects/projectschedule/viewdailyproject",
                                { state: { item: data } }
                              )
                            }
                            className="cursor-pointer bg-green-200 rounded-sm p-1.5 text-green-600"
                          >
                            <FiEye />
                          </p>
                          <p
                            onClick={() => toggleRow(index)}
                            className="cursor-pointer bg-blue-200 rounded p-0.5 text-blue-600"
                          >
                            {expandedRow === index ? <ChevronUp /> : <ChevronDown />}
                          </p>
                        </td>
                      </tr>

                      {expandedRow === index && (
                        <tr>
                          <td colSpan="9" className="px-6 py-1">
                            <div className="bg-white px-4 py-4 rounded-md">
                              <table className="w-full table-fixed text-center text-sm">
                                <tbody className="bg-gray-200">
                                  {data.details?.length > 0 ? (
                                    data.details.map((detail, i) => (
                                      <tr key={i} className="border-b-2 border-white">
                                        <td className="py-1.5 text-start px-8">
                                          {String.fromCharCode(97 + i)}) {detail.contractor}
                                        </td>
                                        <td className="py-1.5 text-start px-8">{detail.quantity}</td>
                                        <td>{detail.unit}</td>
                                        <td>{detail.manPower}</td>
                                        <td>{detail.startDate}</td>
                                        <td>{detail.daysRemaining}</td>
                                        <td
                                          className={
                                            detail.status === "planned"
                                              ? "text-orange-500 font-semibold"
                                              : detail.status === "ongoing"
                                              ? "text-blue-600 font-semibold"
                                              : detail.status === "completed"
                                              ? "text-green-600 font-semibold"
                                              : ""
                                          }
                                        >
                                          {detail.status
                                            ? detail.status.charAt(0).toUpperCase() +
                                              detail.status.slice(1)
                                            : ""}
                                        </td>
                                      </tr>
                                    ))
                                  ) : (
                                    <tr>
                                      <td colSpan="6" className="text-center py-4 text-red-500">
                                        No data available
                                      </td>
                                    </tr>
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DailyProjects;
