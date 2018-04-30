export class UserProfileUpdate {
    constructor(){

    }
   
    getYears(){
        let currentYear = 2002, years = [];
        let startYear =  1934;

        while (startYear <= currentYear) {
            years.push(startYear++);
        }

        return years;
    }
   
      
 
    years = this.getYears();

}