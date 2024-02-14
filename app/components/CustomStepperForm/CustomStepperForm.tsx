'use client'
import styles from "./customStepperForm.module.css";
import useStoredData from "@/app/hooks/useStoreData";
import React, { useEffect, useState } from 'react';
import { IUser, TFormData } from "@/types";
import { 
  PokemonCard, 
  UserForm, 
  PokemonForm, 
  EditNoteOutlinedIcon, 
  Fab, 
  Container, 
  Stepper,
  Step,
  StepLabel,
  StepContent,
} from "..";

const steps = [
  'Profile',
  'Select your favorite pokemon',
  'Done'
];

const CustomStepperForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [storedData] = useStoredData();
  const [formData, setFormData] = useState<TFormData>({
    name: '', 
    email: '',
    selected_pokemon: ''
  });


  /***
   * check for stored data and move to display page if (user) data found
   */
  useEffect(() => {
    if (!!storedData && storedData.selected_pokemon) { 
      setFormData(storedData as TFormData);
      setActiveStep(2);
    }
  }, [storedData])

  /**
   * updates form data with user form values and update next step
   * @param data - user data passed from user form
   */
  const handleUserSubmit = (data: IUser) => {
    setFormData({ ...formData, ...data });
    setActiveStep((prevStep) => prevStep + 1);
  }

  /**
   * updates form data with pokemon form values and update next step
   * @param data - pokemon name passed from user form
   */
  const handlePokemonSubmit = (data: Partial<TFormData>) => {
    setFormData({ ...formData, ...data });
    setActiveStep((prevStep) => prevStep + 1);
    // all form is submitted at this point
    localStorage.setItem('user-form-data', JSON.stringify({ ...formData, ...data }));
  }

  /***
   * handles bringing user to initial step for edits 
   */
  const handleFormEdit = () => {
    setFormData(storedData as TFormData);
    setActiveStep(0);
  }

  return (
    <>
      <Container sx={{ width: '100%' }} className={styles.container}>
        <Stepper activeStep={activeStep}  orientation="vertical">
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel 
                sx={{
                  color: 'white',
                  '& .MuiStepLabel-label.Mui-active': {
                    opacity: 0.8

                  },
                  '& .MuiStepLabel-label.Mui-completed': {
                    opacity: 0.9
                  },
                  '& .MuiStepLabel-label.Mui-disabled': {
                    opacity: 0.3
                  },
                  '& .MuiSvgIcon-root-MuiStepIcon-root.Mui-active': {
                    fill: 'var(--tertiary)'
                  }
                }}
              >
                {label}</StepLabel>
                <StepContent>
                  {activeStep === 0 && <UserForm submitHandler={handleUserSubmit} />}
                  {activeStep === 1 && <PokemonForm submitHandler={handlePokemonSubmit} />}
                  {activeStep === 2 && <PokemonCard pokemonName={formData.selected_pokemon} userName={formData.name} />}
                </StepContent>
            </Step>
          ))}
          {activeStep === 2 && 
            <div onClick={handleFormEdit} className={styles.edit}>
              <Fab  size="small" color="primary">
                <EditNoteOutlinedIcon />  
              </Fab>
            </div>
          }
        </Stepper>
      </Container>
    </>
  );
    
}

export default CustomStepperForm

