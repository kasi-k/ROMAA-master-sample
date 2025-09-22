
import { WBSData } from "../../../components/Data";
import Filters from "../../../components/Filters";
import Table from "../../../components/Table";

const WBSColumns = [
  { label: "Item Description", key: "desc" },
  { label: "Quantity", key: "qty" },
  { label: "Unit", key: "unit" },
  { label: "Rate", key: "rate" },
  { label: "Amount", key: "amount" },

];

const WBS = () => {
  return (
    <Table
      title="Projects Management"
      subtitle="Work Breakdown Structure"
      pagetitle="Work Breakdown Structure"
      endpoint={WBSData}
      columns={WBSColumns}
    routepoint={"viewwbs"}
      FilterModal={Filters}
    />
  );
};

export default WBS;
