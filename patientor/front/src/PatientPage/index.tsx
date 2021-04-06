import React from 'react';
import axios from 'axios';
import {apiBaseUrl} from '../constants';
import {useStateValue,setPatient} from '../state';
import { useParams } from 'react-router';
import { Patient } from '../types';
import { Container, Header, Icon, List } from 'semantic-ui-react';


const index = () => {
    const [{patient},dispatch]= useStateValue();
    const {id} = useParams<{id:string}>() ;
    
   
    React.useEffect(()=>{
      
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
               return (<Container key={e.id}>
                   <Header.Subheader>{e.type==='OccupationalHealthcare' ? e.sickLeave?.startDate : null} {e.description}</Header.Subheader>
                   <List bulleted>
                       {e.diagnosisCodes?.map(c=><List.Item key={c}>{c}</List.Item>)}
                   </List>
                   </Container>);
           })}
        </Container>
    );
};

export default index;
