
const height: number = Number(process.argv[2]);
const weight: number = Number(process.argv[3])

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
console.log(calculateBMI(height, weight))