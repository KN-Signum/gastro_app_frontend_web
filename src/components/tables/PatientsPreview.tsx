import { usePatientsCtx } from "../../Providers/PatientsProvider"
import { Button, Table } from "uiw"
import { useState } from "react";
import "./PatientsPreviev.css"

export default function PatientsPreview() {
    const patientsCtx = usePatientsCtx()
    const [sorted, setSorted] = useState(patientsCtx.patients)
    const columns = [
        { title: "Imię i nazwisko", key: "name" },
        { title: "Wiek", key: "age", width: 80 },
        { title: "E-mail", key: "email" },
        { title: "Nr telefonu", key: "phone_number" },
        { title: "CDAI Score", key: "cdai_score" },
    ];
    const handleSort = () => {
        const newArray = [...sorted].sort((a, b) => a.age - b.age)
        setSorted(newArray)
    }

    return (
        <div className="patientsPrevievContainer" style={{ display: "flex", flexDirection: "column" }}>
            <div className="patientsPreviewHeader" style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button onClick={handleSort} type="primary" size="small">Posortuj</Button>
            </div>
            <div className="patientsPreviewTable">
                <Table columns={columns} data={sorted} />
            </div>
        </div>
    )
}
