
import axios from 'axios';
// import { BOQData } from '../../../../../components/Data';
import DeleteModal from '../../../components/DeleteModal';
import Table from '../../../components/Table'
import { API } from '../../../constant';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useProject } from '../ProjectContext';

const customerColumns = [
  { label: "Item Code", key: "item_name" },
  { label: "Item Description", key: "description" },
  { label: "Quantity", key: "quantity" },
  { label: "Units", key: "unit" },
  { label: "Final Rate", key: "zero_cost_unit_rate" },
  { label: "Amount", key: "zero_cost_final_amount" },
];

const ZeroCost = () => {
  const { tenderId } = useProject();

  

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchZeroCost = async () => {
    if (!tenderId) return;
    setLoading(true);
    try {
      const res = await axios.get(`${API}/boq/items/${tenderId}`, {
        params: {
          page: currentPage,
          limit: 10,
        },
      });

      setItems(res.data.data || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      toast.error("Failed to fetch BOQ items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchZeroCost();
  }, [tenderId, currentPage]);

  const handleDeleteZeroCostItem = async (item_code) => {
    try {
      await axios.delete(`${API}/boq/removeitem/${tenderId}/${item_code}`);
      toast.success("Item deleted successfully");
      fetchZeroCost(); // refresh table
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete BOQ item");
    }
  };

  return (
    <>
    <Table
      title="Zero Cost"
      subtitle={`Tender: ${tenderId}`}
      endpoint={items}
      columns={customerColumns}
     // EditModal={true}       
      exportModal={false}
      DeleteModal={DeleteModal}
      deletetitle="Zero Cost"
      totalPages={totalPages}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      onUpdated={fetchZeroCost}
      onSuccess={fetchZeroCost}
      onDelete={handleDeleteZeroCostItem}
      idKey="item_code"
  
    />
    
    </>
  )
}

export default ZeroCost