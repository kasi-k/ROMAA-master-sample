import { RoadAbstractdata } from "../../../../components/Data";
import Table from "../../../../components/Table";



const RoadAbstractColumns = [
  { label: "Item Description", key: "itemdesc" },
  { label: "Quantity", key: "quantity" },
  { label: "Unit", key: "unit" },
  { label: "Rate", key: "rate" },
  { label: "Amount", key: "amount" },
];

const RoadAbstract = () => {
  return (
    <Table
      contentMarginTop="mt-0"
      endpoint={RoadAbstractdata}
      columns={RoadAbstractColumns}
      routepoint={"viewroadabstract"}
      exportModal={false}
    />
  );
};

export default RoadAbstract;
