import { InletAbsdata } from "../../../../components/Data";
import Table from "../../../../components/Table";


const NewInletAbsColumns = [
  { label: "Item Description", key: "itemdesc" },
  { label: "Quantity", key: "quantity" },
  { label: "Unit", key: "unit" },
  { label: "Rate", key: "rate" },
  { label: "Amount", key: "amount" },
];

const NewInletAbs = () => {
  return (
    <Table
      contentMarginTop="mt-0"
      endpoint={InletAbsdata}
      columns={NewInletAbsColumns}
      routepoint={"viewnewinletabs"}
      exportModal={false}
    />
  );
};

export default NewInletAbs;
