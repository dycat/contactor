import { useEffect, useState } from "react";
import { IPersonState } from "../utils/ipersonstate";
import { AddressValidation, IValidation,PersonValidation, PhoneValidation  } from "./validator";

interface IValidationProps {
    CurrentState: IPersonState;
    CanSave: (canSave: boolean) => void;
}

export function FormValidation({CurrentState, CanSave}: IValidationProps) : JSX.Element {
    var failures: string[];
    let validations: IValidation[];
    var [errors,setErrors] =  useState(Array<JSX.Element>()) ;

    const Validate = () => {
        validations.forEach(validation => {
            validation.Validate(CurrentState, failures);
        });
        CanSave(failures.length === 0);
    }

    useEffect(() => {
        failures = Array<string>()
        validations = Array<IValidation>()
        validations.push(new PersonValidation());
        validations.push(new AddressValidation());
        validations.push(new PhoneValidation());
        Validate();
        setErrors(failures.map( (failure) => {
            return (<div key={failure}><label>{failure}</label></div>);
        })) 
    }, [CurrentState])

        
    return (<div>{errors}</div>);
}