  export class PhoneNumber {
    country: string;
    line: string;
    // format phone numbers as E.164
    get e164() {
      const num = this.country + this.line;
      console.log("Number is :", num);
      return `+${num}`
    }
  }