import { Dispatch, SetStateAction } from "react"

export type userContextType = {
    user: userType,
    setUser:  Dispatch<SetStateAction<userType>>,
    isLoggedIn: boolean,
    setIsLoggedIn: Dispatch<SetStateAction<boolean>> 
}
export type patientContextType = {
    patients: patientType[],
    addPatient: (p: patientType) => void,
    removePatient: (id: string) => void,
    setPatients?: Dispatch<SetStateAction<patientType[]>>
}

export type userType = {
    email: string,
    first_name: string,
    id: string,
    last_name: string,
    phone_number: string,
    role: string,
    specialization: string
}
export type patientType = {
    age: number
    cdai_score: null | number
    email: string
    height: number
    id: string
    name: string
    phone_number: string
    weight: number
}