import { RoadDetaileddata } from "../../../../components/Data";
import Table from "../../../../components/Table";

const RoadDetailedColumns = [
  { label: "Item Description", key: "itemdesc" },
  { label: "Number", key: "number" },
  { label: "Length", key: "length" },
  { label: "Breadth", key: "breadth" },
  { label: "Density", key: "density" },
];

const RoadDetailed = () => {
  return (
    <Table
      contentMarginTop="mt-0"
      endpoint={RoadDetaileddata}
      columns={RoadDetailedColumns}
      routepoint={"viewroaddetailed"}
      exportModal={false}
    />
  );
};

export default RoadDetailed;
