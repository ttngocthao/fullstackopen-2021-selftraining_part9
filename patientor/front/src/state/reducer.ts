import { State } from "./state";
import { Patient,Diagnosis} from "../types";


export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
     type: "SET_PATIENT";
     payload: Patient;
  }
  | {
      type:"SET_DIAGNOSES_LIST"; 
      payload: Diagnosis[];
  }|{
     type:"ADD_PATIENT_ENTRY";
     payload: Patient;
  };

export const setPatientList =(patientListFromApi:Patient[]):Action=>{
  return {     
      type:'SET_PATIENT_LIST',  
      payload: patientListFromApi   
  };
};

export const setPatient =(patientFromApi:Patient):Action=>{
  return {
    type: 'SET_PATIENT',
    payload: patientFromApi
  };
};

export const setDiagnosesList =(diagnosesListFromApi:Diagnosis[]):Action=>{
  return{
    type: 'SET_DIAGNOSES_LIST',
    payload: diagnosesListFromApi
  };
};



export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case 'SET_PATIENT':
      //console.log('set patient reducer',action.type,action.payload);
      return {
        ...state,
        patient: action.payload

      };
    case 'SET_DIAGNOSES_LIST':
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnoses
        }
      };
    case 'ADD_PATIENT_ENTRY':
        return{
          ...state,
          patient:  action.payload        
        };
    default:
      return state;
  }
};

