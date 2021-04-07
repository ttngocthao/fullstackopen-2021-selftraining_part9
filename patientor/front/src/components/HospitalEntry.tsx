import React from 'react';
import { Header, Icon, Segment} from 'semantic-ui-react';
import {HospitalEntry} from '../types';

const HospitalEntryComp =({date,description,discharge}:HospitalEntry)=>{
    return(
        <Segment piled style={{margin:'20px auto'}}>
            <Header as='h3'>{date} <Icon name='hospital' size='big'/></Header>
            <Header.Subheader>{description}</Header.Subheader>
            <Header.Subheader>Discharge: {discharge.date} - {discharge.criteria}</Header.Subheader>
        </Segment>
    );
};

export default HospitalEntryComp;