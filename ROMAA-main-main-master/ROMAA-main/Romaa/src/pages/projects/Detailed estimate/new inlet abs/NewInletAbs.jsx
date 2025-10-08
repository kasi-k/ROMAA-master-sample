import axios from "axios";
import { InletAbsdata } from "../../../../components/Data";
import Table from "../../../../components/Table";
import { API } from "../../../../constant";
import { useState } from "react";
import { useParams } from "react-router-dom";

const NewInletAbsColumns = [
  { label: "Item Description", key: "description" },
  { label: "Quantity", key: "quantity" },
  { label: "Unit", key: "unit" },
  { label: "Rate", key: "rate" },
  { label: "Amount", key: "amount" },
];

const NewInletAbs = ({ name }) => {
  // const { tender_id } = useParams();
  // const [abstract, setAbstract] = useState([]);
  // const [loading, setLoading] = useState(false);

  // const fetchAbstract = async () => {
  //   setLoading(true);
  //   try {
  //     const res = await axios.get(
  //       `${API}/detailedestimate/getdatacustomhead?tender_id=${tender_id}&nametype=${name}`
  //     );
  //     console.log(res);

  //     setAbstract(res.data.data || []);
  //   } catch (err) {
  //     toast.error("Failed to fetch tenders");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // useEffect(() => {
  //   fetchAbstract();
  // }, [tender_id, name]);
  return (
    <Table
      // loading={loading}
      contentMarginTop="mt-0"
      endpoint={InletAbsdata}
      columns={NewInletAbsColumns}
      routepoint={"viewnewinletabs"}
      exportModal={false}
    />
  );
};

export default NewInletAbs;
