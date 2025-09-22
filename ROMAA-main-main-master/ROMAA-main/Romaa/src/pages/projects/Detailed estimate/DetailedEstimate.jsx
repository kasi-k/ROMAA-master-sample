import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Title from "../../../components/Title";
import GeneralAbstract from "./general abstract/GeneralAbstract";
import BOQProject from "./BOQProjects/BOQProject";
import NewInletDet from "./new inlet det/NewInletDet";
import NewInletAbs from "./new inlet abs/NewInletAbs";
import RoadDetailed from "./road detailed/RoadDetailed";
import RoadAbstract from "./road abstract/RoadAbstract";
import Retainingwall from "./retaining wall/Retainingwall";
import RetainingAbstract from "./retaining abstract/RetainingAbstract";
import Contract from "./contract/Contract";
import VendorProject from "./vendor/VendorProjects";

const tabs = [
  {
    id: "1",
    label: " GS(General Abstract)",
    component:<GeneralAbstract />,
  },
  {
    id: "2",
    label: "Bill of Qty",
    component:<BOQProject/>,
  },
  {
    id: "3",
    label: "New Inlet Det",
    component:<NewInletDet/>,
  },
    {
    id: "4",
    label: "New Inlet Abs",
    component: <NewInletAbs />,
 
  },
  {
    id: "5",
    label: " Road Detailed",
    component:<RoadDetailed/>,
  },
  {
    id: "6",
    label: " Road Abstract",
    component: <RoadAbstract />,
  },

  {
    id: "7",
    label: " Retaining Wall",
    component:<Retainingwall/>,
  },
  {
    id: "8",
    label: " Retaining Abstract",
    component: <RetainingAbstract />, 
  },
  {
    id: "9",
    label: "Contract",
    component:<Contract/>,
  },
  {
    id: "10",
    label: "Vendor",
    component:<VendorProject/>,
  },
];

const DetailedEstimate = () => {
  const navigate = useNavigate();
const [searchParams, setSearchParams] = useSearchParams();
const defaultTab = tabs[0].id;
const activeTab = searchParams.get("tab") || defaultTab;

const handleTabChange = (id) => {
  setSearchParams({ tab: id });
};

  const activeTabData = tabs.find((tab) => tab.id === activeTab);

  return (
    <>
      <div className="font-roboto-flex flex flex-col h-full">
        <div className="font-roboto-flex flex justify-between items-center ">
          <Title
            title="Projects Management"
            sub_title="Detailed Estimate"
            active_title={activeTabData?.label}
          />
        </div>
        <div className=" font-roboto-flex  cursor-pointer flex justify-between items-center  ">
          <div className="flex flex-wrap gap-2 py-2.5 ">
            {tabs.map(({ id, label }) => (
              <p
                key={id}
                className={`flex gap-2 items-center px-4 py-2.5 font-medium rounded-lg text-sm whitespace-nowrap ${
                  activeTab === id
                    ? "bg-darkest-blue text-white"
                    : "dark:bg-layout-dark dark:text-white bg-white text-darkest-blue "
                }`}
                onClick={() => handleTabChange(id)}
              >
                {label}
              </p>
            ))}
          </div>
        </div>
        <div className=" h-full overflow-y-auto  no-scrollbar">
          {activeTabData?.component}
        </div>
      </div>
    </>
  );
};

export default DetailedEstimate;
