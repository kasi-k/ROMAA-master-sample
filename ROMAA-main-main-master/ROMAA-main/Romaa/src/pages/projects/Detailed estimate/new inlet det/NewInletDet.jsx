import { NewInletDetdata } from "../../../../components/Data";
import Table from "../../../../components/Table";



const BoqProjectsColumns = [
  { label: "Item Description", key: "itemdesc" },
  { label: "Number", key: "number" },
  { label: "Length", key: "length" },
  { label: "Breadth", key: "breath" },
  { label: "Density", key: "density" },
  { label: "Contents", key: "contents" },
];

const NewInletDet = () => {
  return (
    <Table
    contentMarginTop="mt-0"
      endpoint={NewInletDetdata}
      columns={BoqProjectsColumns}
      routepoint={"viewnewinletdet"}
      exportModal={false}
    />
  );
};

export default NewInletDet;
