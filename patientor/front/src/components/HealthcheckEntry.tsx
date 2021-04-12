import React from 'react';
import { Header, Icon, Segment,SemanticCOLORS} from 'semantic-ui-react';
import {HealthCheckEntry} from '../types';

const HealthcheckEntry = ({entry}:{entry:HealthCheckEntry}) => {
    const {healthCheckRating,date,description}=entry;
    let color: SemanticCOLORS | undefined;
    switch(healthCheckRating){
        case 0:
            color = 'green';
            break;
        case 1:
            color = 'yellow';
            break;
        case 2:
            color = 'orange';
            break;
        default:
            color = 'red';
            break;

    }
    return (
        <Segment piled style={{margin:'20px auto'}}>
            <Header as='h3'>{date} <Icon name='doctor' size='big'/></Header>
            <Header.Subheader>{description}</Header.Subheader>
            <Icon name='heart' size='large' color={color}/>
        </Segment>
    );
};

export default HealthcheckEntry;
