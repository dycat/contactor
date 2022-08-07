import { useEffect, useState } from "react";
import { IPersonState } from "../utils/ipersonstate";
import { AddressValidation, IValidation,PersonValidation, PhoneValidation  } from "./validator";

interface IValidationProps {
    CurrentState: IPersonState;
    CanSave: (canSave: boolean) => void;
}

export function FormValidation({CurrentState, CanSave}: IValidationProps) : JSX.Element {
    var failures: string[] = Array<string>();
    const validations: IValidation[] = Array<IValidation>();
    var [errors,setErrors] =  useState(Array<JSX.Element>()) ;

    const Validate = () => {
        validations.push(new PersonValidation());
        // validations.push(new AddressValidation());
        // validations.push(new PhoneValidation());
        validations.forEach(validation => {
            validation.Validate(CurrentState, failures);
        });
        CanSave(failures.length === 0);
    }

    useEffect(() => {
        console.log(CurrentState)
        console.log(failures)
        Validate();
        setErrors(failures.map( (failure) => {
            return (<div key={failure}><label>{failure}</label></div>);
        })) 
    })

        
    return (<div>{errors}</div>);
}