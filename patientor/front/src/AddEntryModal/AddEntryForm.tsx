import React from 'react';

import { Field, Formik, Form } from "formik";
import {EntryFormValues,TypeOption} from '../types';
import {NumberField,SelectField, TextField, DiagnosisSelection} from '../AddPatientModal/FormField';
import {useStateValue} from '../state';
import { Grid,Button } from 'semantic-ui-react';


interface Props {
  onSubmit: (values: EntryFormValues ) => void;
  onCancel: () => void;
}

const entryTypeOptions: TypeOption[] = [
  { value: 'HealthCheck', label: "Health Check" },
  { value: 'Hospital', label: "Hospital" },
  { value: 'OccupationalHealthcare', label: "Occupational Healthcare" }
];

const isDate =(date:string):boolean=>{
   
    if(date.length===0){
        
        return true;
    }
   
    return Boolean(Date.parse(date));
};

const AddEntryForm = ({onSubmit,onCancel}:Props) => {
    const today = new Date();
   const [{ diagnoses }] = useStateValue();
    const style = { padding: 5, borderStyle: 'solid', borderWidth: 'thin', borderRadius: 10, marginBottom: 10, borderColor: '#DCDCDC' };
    return (       
        <Formik
            initialValues={{
                date: `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`,
                description: "",
                specialist: "",
                diagnosisCodes:[],
                type:'HealthCheck',
                healthCheckRating:0,
                employerName:'',
                sickLeave:{
                    startDate:'',
                    endDate:''
                },
                discharge:{
                    date:'',
                    criteria:''
                }
            }}
            onSubmit={onSubmit}
            validate={values=>{
                const requiredError = "Field is required";
                const dateError = 'Incorrect date format';
                const errors: { [field: string]: string } = {};

                if(!values.date){
                    errors.date = requiredError;
                }

                if(values.date && !isDate(values.date)){
                    errors.date = dateError;
                }
              
                if(!values.description || values.description.length===0){
                    errors.description = requiredError;
                }
                if(!values.specialist || values.specialist.length===0){
                    errors.specialist = requiredError;
                }
                
                if(values.type==='HealthCheck'){
                    const healthCheckRating = values.healthCheckRating;
                    if(!healthCheckRating){
                         errors.healthCheckRating = requiredError;
                    }
                    if(![0,1,2,3].includes(healthCheckRating as number)){
                        errors.healthCheckRating ='Value must be from 0 to 3';
                    }                   
                }

                if(values.type=== 'Hospital'){
                    const discharge = values.discharge;
                    if(discharge && !isDate(discharge.date)){
                        errors.discharge = dateError;
                    } 
                    if(discharge && !discharge.criteria){
                        errors.discharge = requiredError;
                    }                 
                }

                if(values.type==='OccupationalHealthcare'){
                    const sickLeave = values.sickLeave;
                    if(sickLeave && (!isDate(sickLeave.startDate)|| !isDate(sickLeave.endDate))){
                        errors.sickLeave = dateError;
                    }
                }
              
                return errors;
            }}
        >
        {({isValid,dirty,setFieldValue,setFieldTouched,values,errors})=>{ 
           
            return (
                <Form className="form ui">
                    
                    <Field
                        label='Date'
                        placeholder="YYYY-MM-DD"
                        name="date"
                        component={TextField}
                    />
                    <Field
                        label='Description'
                        placeholder="Description"
                        name="description"
                        component={TextField}
                    />
                    <Field
                        label='Specialist'
                        placeholder="Specialist"
                        name="specialist"
                        component={TextField}
                    />
                     <DiagnosisSelection
                        setFieldValue={setFieldValue}
                        setFieldTouched={setFieldTouched}
                        diagnoses={Object.values(diagnoses)}
                    />
                    <SelectField
                        label="Entry Type"
                        name="type"
                        options={entryTypeOptions}
                        />
                    {values.type==='HealthCheck' &&  <Field
                        label="Rating"
                        name="healthCheckRating"
                        component={NumberField}
                        min={0}
                        max={3}
                    />}
                    {values.type==='Hospital' && 
                        <div style={style}>
                            <h4>Discharged</h4>
                            <Field
                            label='Date'
                            placeholder='YYYY-MM-DD'
                            name='discharge.date'
                            component={TextField}                        
                            />
                            <div style={{color:'red',marginBottom:5}}>
                                {errors.discharge}
                            </div>
                            <Field
                                label='Discharge criteria'
                                placeholder='Criteria'
                                name='discharge.criteria'
                                component={TextField}
                            />
                        </div>}
                    {values.type==='OccupationalHealthcare' && <>
                         <Field
                            label='Employer Name'
                            placeholder="Jane Doe"
                            name='employerName'
                            component={TextField}
                        />
                        <div>
                            <h4>Sick Leaves</h4>
                            <div style={{color:'red',marginBottom:5}}>
                                {errors.sickLeave}
                            </div>
                            <Field
                                label='Start date'
                                placeholder="YYYY-MM-DD"
                                name={`sickLeave.startDate`}
                                component={TextField}
                            />
                            <Field
                                label='End date'
                                placeholder="YYYY-MM-DD"
                                name='sickLeave.endDate'
                                component={TextField}
                            />
                        </div>
                      
                       
                    </>}
                    
                    
                    <Grid>
                        <Grid.Column floated="left" width={5}>
                            <Button type="button" onClick={onCancel} color="red">
                            Cancel
                            </Button>
                        </Grid.Column>
                        <Grid.Column floated="right" width={5}>
                            <Button
                                type="submit"
                                floated="right"
                                color="green"
                                disabled={!dirty || !isValid}
                                >
                                Add
                            </Button>
                        </Grid.Column>
                    </Grid>
                </Form>
             );
        }}
    </Formik>
    );
};

export default AddEntryForm;
