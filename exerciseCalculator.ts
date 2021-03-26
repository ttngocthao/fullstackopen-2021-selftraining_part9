
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
console.log(calculateExercise([3, 0, 2, 4.5, 0, 3, 1]))