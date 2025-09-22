import Filters from "../../../components/Filters";
import Table from "../../../components/Table";
import { LuUserRoundSearch } from "react-icons/lu";
import { CustomerData } from "../../../components/Data";
import EditClients from "./EditClients";
import ViewClients from "./ViewClients";
import AddClients from "./AddClients";
import { useEffect, useState } from "react";
import { API } from "../../../constant";
import { toast } from "react-toastify";
import axios from "axios";

const ClientColumns = [
  { label: "Client ID", key: "client_id" },
  { label: "Name", key: "client_name" },
  {
    label: "Address",
    key: "address", // This won't be directly accessed, we use render instead
    render: (item) =>
      `${item.address?.city || ""}, ${item.address?.state || ""}, ${
        item.address?.country || ""
      } - ${item.address?.pincode || ""}`,
  },
  { label: "Phone", key: "contact_phone" },
  { label: "Email", key: "contact_email" },
  
];

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [filterParams, setFilterParams] = useState({
    fromdate: "",
    todate: "",
  });

  const fetchClients = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/client/getclients`, {
        params: {
          page: currentPage,
          limit: 10,
          search: searchTerm,
          fromdate: filterParams.fromdate,
          todate: filterParams.todate,
        },
      });

      setClients(res.data.data);
      setTotalPages(res.data.totalPages);
      console.log(res.data);
    } catch (err) {
      toast.error("Failed to fetch clients");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, [currentPage, searchTerm, filterParams]);

  return (
    <Table
      title="Tender Management"
      subtitle="Client"
      pagetitle="Clients Management"
      endpoint={clients}
      columns={ClientColumns}
      AddModal={AddClients}
      EditModal={EditClients}
      ViewModal={ViewClients}
      FilterModal={Filters}
      addButtonLabel="Add Client"
      addButtonIcon={<LuUserRoundSearch size={24} />}
      totalPages={totalPages}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      filterParams={filterParams}
      setFilterParams={setFilterParams}
      onUpdated={fetchClients}
      onSuccess={fetchClients}
    />
  );
};

export default Clients;
