const calculateBMI = (height:number,weight:number): string =>{
    const heightInMeter = height/100
    const calculation = weight/(heightInMeter*heightInMeter)
    console.log(calculation)
    if(calculation > 30){
        return `Obesity`
    }
    if(calculation > 24.9){
        return `Overweight`
    }
    if(calculation >18.5){
        return `Ideal weight`
    } 
    
    return `Underweight`
   
}
console.log(calculateBMI(180, 74))