import React, { useState } from "react";
import Button from "../../../../components/Button";
import Title from "../../../../components/Title";
import { TbPencil, TbPlus } from "react-icons/tb";
import { IoChevronBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { InputField } from "../../../../components/InputField";
import Modal from "../../../../components/Modal";
import { MdOutlineClose } from "react-icons/md";

const schema = yup.object().shape({
   description: yup.string().required("Description is required"),
   quantity: yup
     .number()
     .typeError("Quantity must be a number")
     .required("Quantity is required"),
   units: yup.string().required("Units are required"),
   rate: yup
     .number()
     .typeError("Rate must be a number")
     .required("Rate is required"),
   amount: yup.number().required("Amount is required"),
});

const ViewRoadDetailsSite = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [data, setData] = useState({
    0: [
      {
        label: "Description",
        value:
          "Dismantling clearing away and carefully stacking materials useful for reuse for any thickness of  Plain Cement mortar walls under 3m hight",
        key: "description",
        tooltip: "Description of the item",
      },
      {
        label: "Quantity",
        value: "1.00",
        key: "quantity",
        tooltip: "Quantity in cubic metres",
      },
      {
        label: "Unit",
        value: "Cubic Metre",
        key: "units",
        tooltip: "Unit of measurement",
      },
      {
        label: "Rate",
        value: "100.00",
        key: "rate",
        tooltip: "Rate per cubic metre",
      },
      {
        label: "Amount",
        value: "100.00",
        key: "amount",
        tooltip: "Total amount",
      },
    ],
  });

  const updateField = (key, newValue, section) => {
    setData((prevData) => ({
      ...prevData,
      [section]: prevData[section].map((item) =>
        item.key === key ? { ...item, value: newValue } : item
      ),
    }));
  };

  const handleEditClick = () => setIsEditing(true);
  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const onSubmit = (formData) => {
    const newKey = Object.keys(data).length;
    const newDataSet = [
      {
        label: "Description",
        value: formData.description,
        key: "description",
        tooltip: "Description of the item",
      },
      {
        label: "Quantity",
        value: formData.quantity,
        key: "quantity",
        tooltip: "Quantity in cubic metres",
      },
      {
        label: "Unit",
        value: formData.units,
        key: "units",
        tooltip: "Unit of measurement",
      },
      {
        label: "Rate",
        value: formData.rate,
        key: "rate",
        tooltip: "Rate per cubic metre",
      },
      {
        label: "Amount",
        value: formData.amount,
        key: "amount",
        tooltip: "Total amount",
      },
    ];

    setData((prevData) => ({
      ...prevData,
      [newKey]: newDataSet,
    }));

    reset();
    setIsAdding(false);
    console.log("New Inlet Abs Added:", formData);
    console.log(data);
    
    
  };

  const TooltipWrapper = ({ tooltip, children }) => {
    if (!tooltip) return children;
    return (
      <div className="relative group inline-block cursor-help">
        {children}
        <div className="absolute z-10 hidden group-hover:block bg-indigo-100 text-black text-xs font-semibold px-3 py-1 rounded shadow-md -top-6 left-36 -translate-x-1/2 w-52 whitespace-normal">
          {tooltip}
          <div className="absolute -bottom-1 left-1 w-3.5 h-3 bg-indigo-100 transform rotate-45"></div>
        </div>
      </div>
    );
  };

  const renderField = (field, section) => {
    if (isEditing) {
      if (field.key === "units") {
        return (
          <select
            className="w-full px-2 py-2 rounded text-xs border dark:border-border-dark-grey dark:bg-layout-dark border-input-bordergrey"
            value={field.value}
            onChange={(e) => updateField(field.key, e.target.value, section)}
          >
            <option value="">Select unit</option>
            <option value="Cubic Meter">Cubic Meter</option>
            <option value="Square Meter">Square Meter</option>
            <option value="Kilogram">Kilogram</option>
            <option value="Litre">Litre</option>
            <option value="Meter">Meter</option>
          </select>
        );
      }
      return (
        <input
          type="text"
          className="w-full p-1 border dark:border-border-dark-grey border-input-bordergrey rounded text-xs"
          value={field.value}
          onChange={(e) => updateField(field.key, e.target.value, section)}
        />
      );
    }

    return (
      <TooltipWrapper tooltip={field.tooltip}>
        <p className="text-xs opacity-50">{field.value}</p>
      </TooltipWrapper>
    );
  };

  return (
    <>
      <div>
        <div className="flex justify-between items-center my-2">
          <Title
            title="Site Management"
            sub_title="Detailed Estimate"
            active_title={isEditing ?"Edit Road Details" : "View Road Details"} 
          />
          {!isEditing ? (
            <Button
              button_name="Edit"
              button_icon={<TbPencil size={23} />}
              onClick={handleEditClick}
            />
          ) : (
            <div className="flex gap-2 items-center">
              <Button
                button_name="Add "
                button_icon={<TbPlus size={20} />}
                bgColor="dark:bg-layout-dark bg-white"
                textColor=" dark:text-white text-darkest-blue"
                onClick={() => setIsAdding(true)}
              />
              <Button button_name="Save" onClick={handleSaveClick} />
            </div>
          )}
        </div>

        <div className="dark:bg-layout-dark bg-white p-4 rounded-lg space-y-2 text-sm">
          <p className="font-semibold text-center text-lg">Road Details</p>

          <div className="grid grid-cols-12 gap-2 items-start">
            {Object.entries(data).map(([section, fields]) => (
              <React.Fragment key={section}>
                <div className="col-span-12 flex items-center justify-end">
                  
                  {isEditing && (
                    <Button
                      onClick={() => {
                        setData((prevData) => {
                          const newData = { ...prevData };
                          delete newData[section];
                          return newData;
                        });
                      }}
                      button_name="Remove"
                      button_icon={<MdOutlineClose size={20} />}
                      bgColor="dark:bg-icon-dark-red bg-red-200"
                      textColor="text-red-500"
                    />
                  )}
                </div>

                {fields.map((field) => (
                  <React.Fragment key={field.key}>
                    <p className="col-span-4 font-medium">{field.label}</p>
                    <div className="col-span-8">
                      {renderField(field, section)}
                    </div>
                  </React.Fragment>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="flex justify-end py-2 ">
          <Button
            onClick={() => navigate("..?tab=5")}
            button_name="Back"
            button_icon={<IoChevronBackSharp />}
          />
        </div>
      </div>
      {isAdding && (
        <Modal
          title="Add Road Details"
          onclose={() => setIsAdding(false)}
          child={
            <>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-c gap-4 px-6 py-6">
                  <div className="space-y-4">
                    <InputField
                      label="Description"
                      name="description"
                      register={register}
                      errors={errors}
                      placeholder="Enter Description of the item"
                    />
                    <InputField
                      label="Quantity"
                      name="quantity"
                      register={register}
                      errors={errors}
                      type="number"
                      placeholder="Enter quantity"
                    />
                    <InputField
                      label="Units"
                      name="units"
                      register={register}
                      errors={errors}
                      placeholder="Enter units"
                      type="select"
                      options={[
                        { value: "Cubic Meter", label: "Cubic Meter" },
                        { value: "Square Meter", label: "Square Meter" },
                        { value: "Kilogram", label: "Kilogram" },
                        { value: "Litre", label: "Litre" },
                      ]}
                    />
                    <InputField
                      label="Rate"
                      name="rate"
                      register={register}
                      errors={errors}
                      type="number"
                      placeholder="Enter rate per unit"
                    />
                    <InputField
                      label="Amount"
                      name="amount"
                      register={register}
                      errors={errors}
                      type="number"
                      placeholder="Enter total amount"
                    />
                  </div>
                </div>
                <div className="mx-5 text-xs flex lg:justify-end md:justify-center justify-center gap-2 mb-4">
                  <button
                    type="button"
                    onClick={() => setIsAdding(false)}
                    className="cursor-pointer border dark:border-white dark:text-white border-darkest-blue text-darkest-blue px-6 py-2 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="cursor-pointer px-6 bg-darkest-blue text-white rounded"
                  >
                    Save
                  </button>
                </div>
              </form>
            </>
          }
        />
      )}
    </>
  );
};

export default ViewRoadDetailsSite;
