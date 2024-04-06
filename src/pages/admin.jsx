import "../styles/admin.less";
import { useEffect, useState } from "react";
import UploadStatsButton from "../components/UploadStatsButton";

function AdminPage({ onPageLoad }) {
    const [selectedId, setSelectedId] = useState('');

    useEffect(() => {
        onPageLoad();
    }, []);

    const handleSelectChange = (event) => {
        setSelectedId(event.target.value);
    };

    return (
        <div className="page-admin">
            <select value={selectedId} onChange={handleSelectChange} >
                <option value="">Select an option</option>
                <option value="Moonseekers">Moonseekers</option>
                <option value="Skwad">Skwad</option>
            </select>
            <UploadStatsButton docId={selectedId}/>
        </div>
    );
}

export default AdminPage;
