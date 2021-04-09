import React from 'react';
import { Entry ,EntryType} from '../types';
import HealthcheckEntryComp from './HealthcheckEntry';
import HospitalEntryComp from './HospitalEntry';
import OccupationalHealthcareEntryComp from './OccupationalHealthcareEntry';


const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled entry ${JSON.stringify(value)}`
  );
};


const EntryDetails: React.FC<{entry:Entry}>=({entry})=>{
    switch(entry.type){
        case EntryType.Hospital:
            return <HospitalEntryComp {...entry}/>;
        case EntryType.HealthCheck:
            return <HealthcheckEntryComp {...entry}/>;
        case EntryType.OccupationalHealthcare:
            return <OccupationalHealthcareEntryComp {...entry}/>;
        default:
            return assertNever(entry);
    }
};

export default EntryDetails;