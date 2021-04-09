import React from 'react';

import { Field, Formik, Form, getIn } from "formik";
import {EntryType, HealthCheckRating} from '../types';
import {NumberField,SelectField, TextField, EntryTypeOption,DiagnosisSelection} from '../AddPatientModal/FormField';
import {useStateValue} from '../state';
import { Grid,Button } from 'semantic-ui-react';
import {EntryFormValues} from '../PatientPage';

const correctDateFormat=(dateStr:string):boolean|string=>{
    /**
     *! includes hyphen at index 4, 7
     *! split the date string at hyphen -> array ex: [2020,03,20]
     *! check if number, 
     *! array[0] must have 4 digits, not smaller than 2000, not bigger than current year 
     *! array[1] must have 2 digits, not bigger than 12, not smaller than 1
     *! array[2] must have 2 digits, not bigger than 31, not smaller than 1
     */
    if(dateStr[4]!=='-' || dateStr[7]!=='-'){
        return 'Date format must be YYYY-MM-DD';
    }

    const dateArr = dateStr.split('-');
    const today = new Date();
    const yearStr = dateArr[0];
    const monthStr = dateArr[1];
    const date = dateArr[2];

    if(yearStr.length !== 4){
        return 'Year format must have 4 digits';
    }
    if(isNaN(parseInt(yearStr))){
        return 'Year must be numbers';
    }
    if(parseInt(yearStr)< 2000 || parseInt(yearStr)> today.getFullYear()){
        return 'Year must be from 2000 to current year';
    }
    if(monthStr.length!==2){
        return 'Month format must have 2 digits';
    }
    if(isNaN(parseInt(monthStr))){
        return 'Month must be numbers';
    }
    if(parseInt(monthStr)<1 || parseInt(monthStr)>12){
        return 'Month is not correct';
    }
    if(date.length!==2){
        return 'date format must have 2 digits';
    }
    if(isNaN(parseInt(date))){
        return 'Date must be numbers';
    }
    if(parseInt(date)<1 || parseInt(date)>31){
        return 'Date is not correct';
    }   
    
    return true;
};

interface Props {
  onSubmit: (values: EntryFormValues ) => void;
  onCancel: () => void;
}

const entryTypeOptions: EntryTypeOption[] = [
  { value: EntryType.HealthCheck, label: "Health Check" },
  { value: EntryType.Hospital, label: "Hospital" },
  { value: EntryType.OccupationalHealthcare, label: "Occupational Healthcare" }
];

const AddEntryForm = ({onSubmit,onCancel}:Props) => {
   const [{ diagnoses }] = useStateValue();
    
    return (       
        <Formik
            initialValues={{
                date: "",
                description: "",
                specialist: "",
                diagnosisCodes:[],
                type:EntryType.Hospital,
                healthCheckRating: HealthCheckRating.Healthy,
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
                const errors: { [field: string]: string } = {};
                if(!values.date){
                    errors.date = requiredError;
                }
                if(correctDateFormat(values.date)!== true){
                    const errMsg = correctDateFormat(values.date) as string;
                    errors.date = errMsg;
                }
                if(!values.description){
                    errors.description = requiredError;
                }
                if(!values.specialist){
                    errors.specialist = requiredError;
                }
                
                if(values.type===EntryType.HealthCheck && !values.healthCheckRating){
                    errors.type= 'HealthCheck type requires health check rating field';
                    errors.healthCheckRating = requiredError;
                }

                if(values.type=== EntryType.Hospital && !values.discharge.date){
                    errors.type = 'Hospital type requires discharge date field and discharge criteria field';
                    if(!values.discharge.date){
                       errors['discharge.date']= requiredError;
                    }
                    
                   
                }
                if(values.type=== EntryType.Hospital && !values.discharge.criteria){
                    errors.type = 'Hospital type requires discharge date field and discharge criteria field';
                     if(!values.discharge.criteria){
                        errors['discharge.criteria']=requiredError;
                    }
                }
                if(values.type=== EntryType.Hospital && values.discharge.date){
                    
                    if(correctDateFormat(values.discharge.date)!==true){
                         errors['discharge.date']= correctDateFormat(values.discharge.date) as string;
                    }
                }

                if(values.type===EntryType.OccupationalHealthcare && !values.employerName){
                    errors.type = 'Occupational Health care requires employer name field';
                    errors.employerName= requiredError;
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
                    {values.type===EntryType.HealthCheck &&  <Field
                        label="healthCheckRating"
                        name="healthCheckRating"
                        component={NumberField}
                        min={0}
                        max={3}
                    />}
                    {values.type===EntryType.Hospital && <>
                        <Field
                        label='Discharge date'
                        placeholder='YYYY-MM-DD'
                        name='discharge.date'
                        component={TextField}
                       
                        />
                        <Field
                            label='Discharge criteria'
                            placeholder='Criteria'
                            name='discharge.criteria'
                            component={TextField}
                        />
                    </>}
                    {values.type===EntryType.OccupationalHealthcare && <>
                        <Field
                            label='Sick leaves start date'
                            placeholder="YYYY-MM-DD"
                            name={`sickLeave.startDate`}
                            component={TextField}
                        />
                        <Field
                            label='Sick leaves end date'
                            placeholder="YYYY-MM-DD"
                            name='sickLeave.endDate'
                            component={TextField}
                        />
                        <Field
                            label='Employer Name'
                            placeholder="Jane Doe"
                            name='employerName'
                            component={TextField}
                        />
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
