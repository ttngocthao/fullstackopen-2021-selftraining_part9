import React from 'react';
import axios from 'axios';
import {apiBaseUrl} from '../constants';
import {useStateValue,setPatient,setDiagnosesList} from '../state';
import { useParams } from 'react-router';
import { Patient,Diagnosis } from '../types';
import { Container, Header, Icon } from 'semantic-ui-react';
import EntryDetails from '../components/EntryDetails';


const index = () => {
    const [{patient,diagnoses},dispatch]= useStateValue();
    const {id} = useParams<{id:string}>() ;
    
   
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
           {patient?.entries.length!==0 && patient?.entries.map(e=>{
               return (
                <Container key={e.id}>
                    <EntryDetails entry={e}/>
                </Container>);
           })}
        </Container>
    );
};

export default index;
