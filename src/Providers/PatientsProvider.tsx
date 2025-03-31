import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { patientContextType, patientType } from '../types/types';

const defaultPatient: patientType = {
    age: 0,
    cdai_score: null,
    email: "",
    height: 0,
    id: "",
    name: "",
    phone_number: "",
    weight: 0
}

const defaultContext: patientContextType = {
    patients: [defaultPatient],
    addPatient: (p: patientType) => { },
    removePatient: (id: string) => { },
}

const PatientsContext = createContext(defaultContext);

export default function PatientsProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [patients, setPatients] = useState<patientType[]>(() => {
        const savedPatients = localStorage.getItem('patients')
        if (!savedPatients) return [defaultPatient]
        return JSON.parse(savedPatients)
    })

    useEffect(() => {
        if (patients) {
            localStorage.setItem('patients', JSON.stringify(patients));
        } else {
            localStorage.removeItem('patients');
        }
    }, [patients]);

    const addPatient = (patient: patientType) => {
        setPatients([...patients, patient])
    }
    const removePatient = (id: string) => {
        const updatedArray = patients.filter(p => {
            p.id !== id
        })
        setPatients(updatedArray)
    }

    const value = useMemo(() => ({
        addPatient,
        removePatient,
        setPatients,
        patients,
    }), [patients])

    return (
        <PatientsContext.Provider value={value}>{children}</PatientsContext.Provider>
    );
}

export function usePatientsCtx() {
    const context = useContext(PatientsContext);
    if (!context) throw new Error('useAuth musi być używany wewnątrz UserProvider');
    return context;
}