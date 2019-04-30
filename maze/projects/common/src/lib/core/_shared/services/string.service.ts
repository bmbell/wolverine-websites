import { Injectable } from "@angular/core";

/**
 * Service that provides string manipulation methods
 */
@Injectable({
  providedIn: "root"
})
export class StringService {

    // #region Public Methods

    /**
    * Replaces all instances of the "substring" string with the "replacement" string
    * @param input - The input string
    * @param substring - The substring to replace
    * @param replace - The replacement string
    * @returns The string with the corresponding replacements
    */
    public replaceAll(input: string, substring: string, replacement: string): string {
        return input.split(substring).join(replacement);
    }

    /**
    * Strips all whitespace characters from the input string
    * @param input - The input string
    * @returns The result string
    */
    public stripWhitespace(input: string): string {
        return input.replace(/\s+/g, "");
    }

    /**
    * Indicates whether the string is empty or all whitespace
    * @param input - The input string
    * @returns A value indicating whether the string is empty or all whitespace
    */
    public isEmpty(input: string): boolean {
        return ((input === null || input === undefined) ? true : /^[\s\xa0]*$/.test(input));
    }

    /**
    * Indicates whether the string contains all alpha characters
    * @param input - The input string
    * @returns A value indicating whether the string contains all alpha characters
    */
    public isAlpha(input: string): boolean {
        return !/[^a-z\xDF-\xFF]|^$/.test(input.toLowerCase());
    }

    /**
    * Indicates whether the string contains all alpha-numeric characters
    * @param input - The input string
    * @returns A value indicating whether the string contains all alpha-numeric characters
    */
    public isAlphaNumeric(input: string): boolean {
        return !/[^0-9a-z\xDF-\xFF]/.test(input.toLowerCase());
    }

    /**
    * Indicates whether the string contains all numeric characters
    * @param input - The input string
    * @returns A value indicating whether the string contains all numeric characters
    */
    public isNumeric(input: string): boolean {
        return !/[^0-9]/.test(input);
    }

    /**
    * Indicates whether the string contains all lowercase characters
    * @param input - The input string
    * @returns A value indicating whether the string contains all lowercase characters
    */
    public isLower(input: string): boolean {
        return this.isAlpha(input) && (input.toLowerCase() === input);
    }

    /**
    * Indicates whether the string contains all uppercase characters
    * @param input - The input string
    * @returns A value indicating whether the string contains all uppercase characters
    */
    public isUpper(input: string): boolean {
        return this.isAlpha(input) && (input.toUpperCase() === input);
    }

    /**
    * Indicates whether the string starts with the prefix characters
    * @param input - The input string
    * @param prefix - The prefix characters
    * @returns A value indicating whether the string starts with the prefix characters
    */
    public startsWith(input: string, prefix: string): boolean {
        return (input.lastIndexOf(prefix, 0) === 0);
    }

    /**
    * Indicates whether the string ends with the suffix characters
    * @param input - The input string
    * @param suffix - The suffix characters
    * @returns A value indicating whether the string ends with the suffix characters
    */
    public endsWith(input: string, suffix: string): boolean {

        let isEndingWith = false;

        if (!this.isEmpty(input) && !this.isEmpty(suffix)) {

            const position = input.length - suffix.length;
            isEndingWith = (position >= 0 && input.indexOf(suffix, position) === position);
        }

        return isEndingWith;
    }

    /**
    * Indicates whether the string contains the substring
    * @param input - The input string
    * @param substring - The substring
    * @returns A value indicating whether the string contains the substring
    */
    public contains(input: string, substring: string): boolean {
        return !this.isEmpty(input) && input.indexOf(substring) >= 0;
    }

    /**
     * Splices a new string into the existing string
     * @param input - The input string
     * @param startIndex - The starting index of the splice
     * @param deleteCount - The number of characters to delete at the splice entry point
     * @param stringToSplice - The string to splice into the existing string
     * @returns The new string
     */
    public splice(input: string, startIndex: number, deleteCount: number, stringToSplice: string): string {

        let splicedString = stringToSplice;

        if (!this.isEmpty(input)) {

            splicedString =
                input.slice(0, startIndex) + stringToSplice + input.slice(startIndex + Math.abs(deleteCount));
        }

        return splicedString;
    }

    /**
     * Inserts a substring at the given index
     * @param input - The input string
     * @param startIndex - The starting index to insert
     * @param stringToInsert - The string to insert
     * @returns The new string
     */
    public insert(input: string, startIndex: number, stringToInsert: string): string {
        return this.splice(input, startIndex, 0, stringToInsert);
    }

    // #endregion
}
