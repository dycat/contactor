import { IPersonState } from "../utils/ipersonstate";
import { StringOrNull } from "../utils/Types";

interface IValidator<T> {
  IsValid(input: T): boolean;
}

export class MinLengthValidator implements IValidator<StringOrNull> {
  private minLength: number;
  constructor(minLength: number) {
    this.minLength = minLength;
  }

  IsValid(input: StringOrNull): boolean {
    if (!input) {
      return false;
    }
    return input.length >= this.minLength;
  }
}

export class RegularExpressionValidator implements IValidator<StringOrNull> {
  private regex: RegExp;
  constructor(expression: string) {
    this.regex = new RegExp(expression);
  }

  IsValid(input: StringOrNull): boolean {
    if (!input) {
      return false;
    }
    return this.regex.test(input);
  }
}

export interface IValidation {
  Validate(state: IPersonState, errors: string[]): void;
}

export class PersonValidation implements IValidation {
  private readonly firstnameValidator: MinLengthValidator = new MinLengthValidator(1);
  private readonly lastnameValidator: MinLengthValidator = new MinLengthValidator(2);

  Validate(state: IPersonState, errors: string[]): void {
    if (!this.firstnameValidator.IsValid(state.firstname)) {
      errors.push("The first name is a minimum of 1 character");
    }
    if (!this.lastnameValidator.IsValid(state.lastname)) {
      errors.push("The last name is a minimum of 2 character");
    }
  }
  
}

export class AddressValidation implements IValidation {
  private readonly minLengthValidator: MinLengthValidator =
    new MinLengthValidator(5);
  private readonly zipCodeValidator: RegularExpressionValidator =
    new RegularExpressionValidator("^[0-9]{5}(?:-[0-9]{4})?$");

  public Validate(state: IPersonState, errors: string[]): void {
    if (!this.minLengthValidator.IsValid(state.address1)) {
      errors.push("Address line 1 must be greater than 5 characters");
    }
    if (!this.minLengthValidator.IsValid(state.town)) {
      errors.push("Town must be greater than 5 characters");
    }
    if (!this.minLengthValidator.IsValid(state.country)) {
      errors.push("Country must be greater than 5 characters");
    }
    if (!this.minLengthValidator.IsValid(state.postcode)) {
      errors.push("Postcode must be greater than 5 characters");
    }
  }
}

export class PhoneValidation implements IValidation {
  private readonly regexValidator: RegularExpressionValidator =
    new RegularExpressionValidator(
      "^(?:\\((?:[0-9]{3})\\)|(?:[0-9]{3})[-.]?(?:[0-9]{3})[-. ]?(?:[0-9]{4}))$"
    );

  private readonly minLengthValidator: MinLengthValidator =
    new MinLengthValidator(1);

  public Validate(state: IPersonState, errors: string[]): void {
    if (!this.minLengthValidator.IsValid(state.phonenumber)) {
        errors.push("You must enter a phone number");
    }
    else if (!this.regexValidator.IsValid(state.phonenumber)) {
        errors.push("The phone number format is invalid");
    }
  }
}
