import React, { useState } from "react";
import { TbPencil } from "react-icons/tb";
import { IoChevronBackSharp } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSave } from "react-icons/ai";
import Title from "../../../../components/Title";
import Button from "../../../../components/Button";

const ViewWORequest = () => {
  const location = useLocation();
  const rowData = location.state?.item;
  const navigate = useNavigate();

  const [data, setData] = useState(
    rowData
      ? {
          0: [
            {
              label: "Item Description",
              value: rowData.description,
              key: "description",
            },
            { label: "Quantity", value: "203", key: "qty" },
            { label: "Units", value: "M3", key: "units" },
            { label: "Basic Rate", value: "325", key: "basicrate" },
            { label: "Gross Amount", value: `₹${511}`, key: "grossamnt" },
            { label: "CGST @ 9%", value: `₹${511}`, key: "cgst" },
            { label: "SGST @ 9%", value: `₹${511}`, key: "sgst" },
            { label: "Round Off", value: `₹${511}`, key: "roundoff" },
            { label: "Net Amount", value: `₹${511}`, key: "unit" },
          ],
        }
      : {}
  );

  const renderField = (field) => {
    return <p className="text-xs opacity-50">{field.value}</p>;
  };

  return (
    <>
      <div className="  h-full ">
              <div className="h-1/12">
        <Title
          title="Projects Management"
          sub_title="WOR "
          active_title={" View Work Order Request"}
        />
        </div>
        <div className="overflow-auto h-11/12 no-scrollbar">
        <div className="dark:bg-layout-dark bg-white p-4 rounded-lg space-y-2 text-sm mt-6">
          <div className="grid grid-cols-12 gap-2 items-start">
            {Object.entries(data).map(([section, fields]) => (
              <React.Fragment key={section}>
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
        <div className=" dark:bg-layout-dark bg-white p-4 rounded-lg space-y-2 text-sm mt-6">
          <p className="font-bold text-xl">Terms & Conditions</p>
          <p className="text-xs opacity-50">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias
            iste facilis quae odio magnam. Est quo quisquam magnam. A totam
            cupiditate ad? Accusamus labore officia, enim obcaecati fuga amet
            saepe autem, alias magnam repellendus et placeat nam quibusdam sunt
            mollitia molestias, hic commodi assumenda exercitationem itaque
            necessitatibus illo veritatis dignissimos unde? Est ducimus
            blanditiis fugiat sunt, consectetur officiis distinctio odio
            possimus reprehenderit at incidunt enim dignissimos numquam,
            repellendus dicta libero amet expedita itaque! Ad asperiores commodi
            voluptas fugiat suscipit, facere architecto ea est corrupti
            reprehenderit repellat dolores pariatur sequi animi itaque minima,
            possimus ex, eum repellendus dolorum rem. Temporibus optio hic
            excepturi? Iure saepe natus, distinctio placeat expedita ad
            repudiandae eos earum explicabo magnam molestias hic quasi
            necessitatibus nostrum fugiat quia quam. Amet illo dolore incidunt
            dignissimos doloribus quae quia possimus necessitatibus totam quod,
            reiciendis nostrum quidem soluta voluptatum maiores pariatur.
            Accusantium perferendis consequatur blanditiis! Quasi tenetur error
            rerum nesciunt, perferendis totam mollitia hic cum quod saepe atque
            commodi labore quo officia. Incidunt laborum voluptas quia,
            voluptatum temporibus ipsa enim repudiandae, veritatis vitae amet
            harum excepturi aspernatur deserunt vero aut distinctio? Maxime aut
            rerum ad expedita. Inventore, tenetur eveniet sapiente et dolorum
            molestias suscipit consequatur debitis quaerat iure. Mollitia,
            repudiandae?
          </p>
        </div>

      <div className="flex justify-end py-2 ">
        <Button
          onClick={() => navigate("..?tab=1")}
          button_name="Back"
          button_icon={<IoChevronBackSharp />}
        />
      </div>
       </div>
           </div>
    </>
  );
};

export default ViewWORequest;
