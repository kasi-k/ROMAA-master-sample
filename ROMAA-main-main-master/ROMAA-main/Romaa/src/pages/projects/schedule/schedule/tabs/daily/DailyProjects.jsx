import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { HiArrowsUpDown } from "react-icons/hi2";
import { FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { TbFileExport } from "react-icons/tb";
import UploadModal from "../../UploadModal";
import axios from "axios";
import { API } from "../../../../../../constant";
import { useProject } from "../../../../ProjectContext";

const DailyProjects = () => {
  const navigate = useNavigate();
  const { tenderId } = useProject();
  const [expandedRow, setExpandedRow] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [upload, setUpload] = useState(false);
  const [projectData, setProjectData] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggleRow = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  // Fetch schedules for the selected date
  const fetchSchedules = async (date) => {
    try {
      setLoading(true);
      const formattedDate = format(date, "yyyy-MM-dd");

      const res = await axios.get(`${API}/schedule/getschedule`, {
        params: { tenderId, particularDate: formattedDate },
      });
      console.log(res);

      if (res.data.status) {
        setProjectData(res.data.data);
      } else {
        setProjectData([]);
      }
    } catch (err) {
      console.error("Error fetching schedules:", err);
      setProjectData([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data whenever selectedDate changes
  useEffect(() => {
    if (tenderId) fetchSchedules(selectedDate);
  }, [selectedDate, tenderId]);

  return (
    <>
      {/* Upload Button */}
      <p className="cursor-pointer flex justify-end mb-2">
        <span
          onClick={() => setUpload(true)}
          className="flex items-center dark:bg-layout-dark bg-white px-2 py-2 rounded-md text-sm"
        >
          <TbFileExport size={22} />
          <span className="px-1">Upload </span>
        </span>
      </p>

      {/* Horizontal Date Strip */}
      <div className="w-full bg-white dark:bg-layout-dark border-b-2 dark:border-border-dark-grey border-gray-100 rounded-t-lg px-4 py-3 flex items-center">
        <h2 className="font-semibold dark:text-white text-gray-800 mr-4 w-24 text-left">
          {format(selectedDate, "MMMM")}
        </h2>
        <div className="flex overflow-x-auto no-scrollbar gap-3">
          {Array.from({ length: 31 }, (_, i) => {
            const date = new Date(
              selectedDate.getFullYear(),
              selectedDate.getMonth(),
              i + 1
            );
            return (
              <div
                key={i}
                onClick={() => setSelectedDate(date)}
                className={`flex flex-col items-center justify-center w-10 h-8 py-6 rounded-lg cursor-pointer transition-all duration-200 ${
                  format(date, "yyyy-MM-dd") ===
                  format(selectedDate, "yyyy-MM-dd")
                    ? "bg-darkest-blue text-white font-medium text-sm px-2"
                    : "hover:bg-gray-100 text-darkest-blue text-xs"
                }`}
              >
                <span>{format(date, "dd")}</span>
                <span>{format(date, "EEE")}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Table Section */}
      <div className="mt-4 overflow-y-auto no-scrollbar">
        <div className="overflow-auto no-scrollbar">
          <table className="w-full whitespace-nowrap">
            <thead>
              <tr className="font-semibold text-sm dark:text-white dark:bg-layout-dark bg-white border-b-4 dark:border-border-dark-grey border-light-blue">
                <th className="p-3.5 rounded-l-lg">S.no</th>
                {[
                  "Description",
                  "Quantity",
                  "Units",
                  "Man power",
                  "Start Date",
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
              {loading ? (
                <tr>
                  <td colSpan={9} className="text-center py-4">
                    Loading...
                  </td>
                </tr>
              ) : projectData?.length > 0 ? (
                projectData.map((data, index) => (
                  <React.Fragment key={index}>
                    <tr className="border-b-[3px] dark:bg-layout-dark dark:border-border-dark-grey bg-white border-light-blue text-center">
                      <td className="rounded-l-lg py-3">{index + 1}</td>
                      <td>{data.description}</td>
                      <td>{data.agreementValue}</td>
                      <td></td>
                      <td>
                        {format(new Date(data.workOrderDate), "yyyy-MM-dd")}
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td className="rounded-r-lg flex items-center justify-center gap-2 mt-2">
                        <p
                          onClick={() =>
                            navigate(
                              "/projects/projectschedule/viewdailyproject",
                              {
                                state: { item: data },
                              }
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
                        <td colSpan={9} className="px-6 py-1">
                          <div className="bg-white px-4 py-4 rounded-md">
                            <table className="w-full table-fixed text-center text-sm">
                              <tbody className="bg-gray-200 dark:bg-layout-dark">
                                {data.majorHeadings?.length > 0 ? (
                                  data.majorHeadings.map((mh, i) => (
                                    <tr
                                      key={i}
                                      className="border-b-2 border-white dark:border-border-dark-grey"
                                    >
                                      <td className="py-1.5 text-start px-8">
                                        {mh.majorHeadingName}
                                      </td>
                                      <td colSpan={7}></td>
                                    </tr>
                                  ))
                                ) : (
                                  <tr>
                                    <td
                                      colSpan={8}
                                      className="text-center py-4 text-red-500"
                                    >
                                      No details available
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
              ) : (
                <tr>
                  <td colSpan={9} className="text-center py-4 text-red-500">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {upload && <UploadModal onclose={() => setUpload(false)} />}
    </>
  );
};

export default DailyProjects;
