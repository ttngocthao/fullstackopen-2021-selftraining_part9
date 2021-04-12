import React from 'react';
import { OccupationalHealthcareEntry } from '../types';
import { Header, Icon, Segment} from 'semantic-ui-react';


const OccupationalHealthcareEntryComp = ({entry}:{entry:OccupationalHealthcareEntry}) => {
    const {date,description,employerName,sickLeave}=entry;
    return (
        <Segment piled style={{margin:'20px auto'}}>
            <Header as='h3'>{date} <Icon name='hospital' size='big'/> {employerName}</Header>
            <Header.Subheader>{description}</Header.Subheader>
            {sickLeave &&  <Header.Subheader>Sick Leaves: {sickLeave?.startDate} - {sickLeave?.endDate}</Header.Subheader>}           
        </Segment>
    );
};

export default OccupationalHealthcareEntryComp;
