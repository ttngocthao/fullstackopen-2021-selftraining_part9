
//sample input: [3, 0, 2, 4.5, 0, 3, 1]
interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const parseArgs = (args: string[]):number[]=>{
    if(args.length > 9){
        throw new Error('Too many arguments')
    }
    if(args.length<2){
        return [0,0,0,0,0,0,0]
    }
    //!check if isNaN
    for(let i=2;i<args.length;i++){
        if(isNaN(Number(args[i]))){
            throw new Error(`Provided value must be a number - ${args[i]}`)
        }
    }
    let result =[]
    for(let i = 2; i < args.length ; i ++){
       result.push(Number(args[i]))
    }

    return result
}

const calculateExercise =(exerciseInputs:number[]):Result=>{
    const average = exerciseInputs.reduce((a,c)=>{
            return a + c
        },0)/exerciseInputs.length
    const success = average > 2 ? true : false
    let rating = 1
    let ratingDescription = 'You can do it'
    if(average > 2){
        rating = 3
        ratingDescription = 'Terrific! You are a champion'
    }
    if(average > 1) {
        rating = 2
        ratingDescription = 'Not too bad but could be better'
    }

    return {
        periodLength: exerciseInputs.length,
        trainingDays: exerciseInputs.filter((d:number) => d!== 0).length,
        success: success,
        rating: rating,
        ratingDescription: ratingDescription,
        target: 2,
        average: average
    }
}

try {
   const inputs = parseArgs(process.argv)
   console.log(calculateExercise(inputs))
} catch (error) {
    console.log('Error, something bad happened, message: ', error.message);
}
