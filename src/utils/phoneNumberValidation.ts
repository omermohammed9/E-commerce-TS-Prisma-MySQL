import {
    parsePhoneNumberFromString,
    isPossiblePhoneNumber,
    CountryCode,
    ValidatePhoneNumberLengthResult
} from 'libphonenumber-js';

interface PhoneNumberValidationResult {
    isValid: boolean;
    isPossible: boolean;
    lengthValidation?: ValidatePhoneNumberLengthResult;
}

export function validatePhoneNumber(
    text: string,
    defaultCountry?: CountryCode | { defaultCountry?: CountryCode, defaultCallingCode?: string }
): PhoneNumberValidationResult {
    const phoneNumber = parsePhoneNumberFromString(text, defaultCountry);
    const isValid = phoneNumber ? phoneNumber.isValid() : false;
    const isPossible = isPossiblePhoneNumber(text, defaultCountry);
    //const lengthValidation = validatePhoneNumberLength(text, defaultCountry);

    return { isValid, isPossible };
}
