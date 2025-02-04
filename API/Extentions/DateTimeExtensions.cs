using System;

namespace API.extensions;

public static class DateTimeextensions
{
    public static int CalculateAge(this DateOnly birthDate){
        var todayDate = DateOnly.FromDateTime(DateTime.Now);

        int age = todayDate.Year - birthDate.Year;
        if(todayDate < birthDate.AddYears(age) ){
            age--;
        }

        return age;
    }
}
