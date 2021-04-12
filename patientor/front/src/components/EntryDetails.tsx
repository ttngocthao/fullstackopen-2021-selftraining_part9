import React from 'react';
import { Entry} from '../types';
import HealthcheckEntryComp from './HealthcheckEntry';
import HospitalEntryComp from './HospitalEntry';
import OccupationalHealthcareEntryComp from './OccupationalHealthcareEntry';


const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled entry ${JSON.stringify(value)}`
  );
};


const EntryDetails= ({entry}:{entry:Entry})=>{
    switch(entry.type){
        case 'Hospital':
            return <HospitalEntryComp entry={entry}/>;
        case 'HealthCheck':
            return <HealthcheckEntryComp entry={entry}/>;
        case 'OccupationalHealthcare':
            return <OccupationalHealthcareEntryComp entry={entry}/>;
        default:
            return assertNever(entry);
    }
};

export default EntryDetails;