import React from 'react';
import axios from 'axios';
import {apiBaseUrl} from '../constants';
import {useStateValue,setPatient,setDiagnosesList} from '../state';
import { useParams } from 'react-router';
import { Patient,Diagnosis ,Entry} from '../types';
import { Button, Container, Header, Icon } from 'semantic-ui-react';
import EntryDetails from '../components/EntryDetails';
import AddEntryModal from '../AddEntryModal';


// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
export type EntryFormValues = UnionOmit<Entry,'id'>;


const index = () => {

    const [{patient,diagnoses},dispatch]= useStateValue();
    const {id} = useParams<{id:string}>() ;
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
   const [error, setError] = React.useState<string | undefined>();

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };
    const submitEntryHandle =async(values: EntryFormValues)=>{
        console.log('add entry',values);
        
        try {
            const { data: newEntry } = await axios.post<Patient>(
                `${apiBaseUrl}/patients/${id}/entries`,
                values
            );
            dispatch({ type: "ADD_PATIENT_ENTRY", payload: newEntry });
            closeModal();
            } catch (e) {
            console.error(e.response?.data || 'Unknown Error');
            setError(e.response?.data?.error || 'Unknown error');
        }
    };
   
    React.useEffect(()=>{
        const fetchDiagnosesList = async () => {
            try {
                const {data: diagnosesListFromApi}= await axios.get<Diagnosis[]>(
                `${apiBaseUrl}/diagnoses`
                );
                dispatch(setDiagnosesList(diagnosesListFromApi));
            } catch (error) {
                console.log(error);
            }
            };
        if(diagnoses==={}){
           void fetchDiagnosesList();
        }

        const fetchPatient = async ()=>{
            try {
                if(patient?.id === id){
                    dispatch(setPatient(patient));
                  // dispatch({type:"SET_PATIENT",payload: patient}); 
                }else{
                    const {data: patientFromApi} = await  axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
                    //console.log('call api');
                    dispatch(setPatient(patientFromApi));
                   //dispatch({type:"SET_PATIENT",payload: patientFromApi});  

                }                
               //console.log('patientFromApi',patientFromApi);
            } catch (e) {
                 console.error(e);
            }
        };
       void fetchPatient();
      
    },[]);
    return (
        <Container>
           <Header as='h2'>{patient?.name} <Icon name={patient?.gender ==='male' ?'mars': 'venus'}/></Header>          
           <Header.Subheader>ssn: {patient?.ssn}</Header.Subheader>
           <Header.Subheader>occupation: {patient?.occupation}</Header.Subheader>
           <Header as='h3'>Entries</Header>
           <Button onClick={() => openModal()}>Add New Entry</Button>
           {patient?.entries.length!==0 && patient?.entries.map(e=>{
               return (
                <Container key={e.id}>
                    <EntryDetails entry={e}/>
                </Container>);
           })}
          
           <AddEntryModal 
                modalOpen={modalOpen}
                error={error}
                onSubmit={submitEntryHandle}
                onClose={closeModal}
           />
        </Container>
    );
};

export default index;
