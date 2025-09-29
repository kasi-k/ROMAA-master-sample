import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Title from "../../../../../components/Title";
import GeneralAbstract from "../../../../projects/Detailed estimate/general abstract/GeneralAbstract";
import BOQProject from "../../../../projects/Detailed estimate/BOQProjects/BOQProject";
import NewInletDet from "../../../../projects/Detailed estimate/new inlet det/NewInletDet";
import NewInletAbs from "../../../../projects/Detailed estimate/new inlet abs/NewInletAbs";

// Generic Detailed Component
const DetailedComponent = ({ name }) => (
  <div className="p-4">
    <h2 className="font-semibold text-lg">{name} Detailed</h2>
    <p className="text-gray-600">This is the {name} Detailed content.</p>
  </div>
);

// Generic Abstract Component
const AbstractComponent = ({ name }) => (
  <div className="p-4">
    <h2 className="font-semibold text-lg">{name} Abstract</h2>
    <p className="text-gray-600">This is the {name} Abstract content.</p>
  </div>
);

const TenderDetailedEstimate = () => {
  const [tabs, setTabs] = useState([
    { id: "1", label: "GS(General Abstract)", component: <GeneralAbstract /> },
    { id: "2", label: "Bill of Qty", component: <BOQProject /> },
  ]);

  const [name, setName] = useState("");
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const handleTabChange = (id) => setActiveTab(id);

  const handleAddTabs = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const timestamp = Date.now();

    const newDetailedTab = {
      id: `${timestamp}-det`,
      label: `${name} Detailed`,
      component: <NewInletDet name={name} />,
    };

    const newAbstractTab = {
      id: `${timestamp}-abs`,
      label: `${name} Abstract`,
      component: <NewInletAbs name={name} />,
    };

    setTabs((prev) => [...prev, newDetailedTab, newAbstractTab]);
    setActiveTab(newDetailedTab.id); // switch to the new detailed tab
    setName(""); // clear input
  };

  const activeTabData = tabs.find((tab) => tab.id === activeTab);

  return (
    <div className="font-roboto-flex flex flex-col h-full p-4">
      {/* Input form */}
      <form onSubmit={handleAddTabs} className="flex gap-2 my-3 justify-end">
        <input
          type="text"
          placeholder="Enter Name (e.g., Road, New Inlet)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded px-3 py-2 text-sm w-60"
        />
        <button
          type="submit"
          className="bg-darkest-blue text-white px-4 py-2 rounded-lg text-sm"
        >
          Add Tabs
        </button>
      </form>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 py-2.5">
        {tabs.map(({ id, label }) => (
          <p
            key={id}
            className={`px-4 py-2.5 rounded-lg text-sm cursor-pointer ${
              activeTab === id
                ? "bg-darkest-blue text-white"
                : "dark:bg-layout-dark dark:text-white bg-white text-darkest-blue"
            }`}
            onClick={() => handleTabChange(id)}
          >
            {label}
          </p>
        ))}
      </div>

      {/* Active Component */}
      <div className="h-full overflow-y-auto no-scrollbar mt-2">
        {activeTabData?.component}
      </div>
    </div>
  );
};


export default TenderDetailedEstimate;
