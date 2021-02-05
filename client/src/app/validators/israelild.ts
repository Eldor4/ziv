
import { AbstractControl } from "@angular/forms";
import isIsraeliIdValid from 'israeli-id-validator';

export default function israeliIdValidator(control: AbstractControl): { [key: string]: any } | null {
    if (control.value.length != 9) {
        return { 'id': 'must be 9 digits, if less - padd it with zeros' };
    } else if (!isIsraeliIdValid(control.value)) {
        return { 'id': 'invalid id' };
    } else {
        return null;
    }
} 

