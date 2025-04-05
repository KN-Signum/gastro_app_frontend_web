import { usePatientsCtx } from "../../Providers/PatientsProvider"
import { Button, Table } from "uiw"
import { useState } from "react";
import "./PatientsPreviev.css"
export default function PatientsPreview() {
    const patientsCtx = usePatientsCtx()
    const [sorted, setSorted] = useState(patientsCtx.patients)
    const columns = [
        {
            title: "Imię i nazwisko",
            key: "name",
        },
        {
            title: "Wiek",
            key: "age",
            width: 80,
        },
        {
            title: "E-mail",
            key: "email",
        },
        {
            title: "Nr telefonu",
            key: "phone_number",
        },
        {
            title: "CDAI Score",
            key: "cdai_score",
        }
    ];
    const handleSort = () => {
        const newArray = [...sorted].sort((a, b) => { return a.age - b.age })
        setSorted(newArray)
    }
    return (
        <div className="patientsPrevievContainer">
            <Button onClick={handleSort}> Posortuj</Button>
            <Table
                columns={columns}
                data={sorted}
                title="Szybki podgląd pacjenci"
            />
        </div>

    )
}