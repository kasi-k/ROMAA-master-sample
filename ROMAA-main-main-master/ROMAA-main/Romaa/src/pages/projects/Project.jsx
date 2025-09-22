import { projectdata } from "../../components/Data";
import Filters from "../../components/Filters";
import ProgressBar from "../../components/ProgressBar";
import Table from "../../components/Table";

const Columns = [
  { label: "Project ID", key: "id" },
  { label: "Name", key: "name" },
  { label: "Location", key: "location" },
  {
    label: "Status",
    key: "status",
    
    render: (percentage) => <ProgressBar percentage={percentage.status} />,
  },
  { label: "Project Manager", key: "pmanager" },
  { label: "Budget", key: "budget" },
];

const Project = () => {
  return (
    <Table
      title="Projects Management"
      subtitle="Project"
      pagetitle="Project Table"
      endpoint={projectdata}
      columns={Columns}
      ViewModal={true}
      routepoint={"zerocost"}
      FilterModal={Filters}
    />
  );
};

export default Project;
