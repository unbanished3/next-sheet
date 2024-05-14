let DICE = [4, 6, 8, 10, 12, 20]

export const diceThrow = (dice_number, mod, isExpodable = true) => {
    
    let modifier = Number.parseInt(mod)
    if(Number.isNaN(modifier)){
        modifier = 0
    }

    if(Number.isNaN(dice_number)){
        console.log(dice_number)
        console.log(modifier)
        return;
    }

    let die = DICE[dice_number - 1]

    let result_string = ''
    let sum = 0

    let result = Math.floor(Math.random() * (die) + 1)
    result_string += result
    sum += result

    if(isExpodable){
        while(result === die){
            result_string += '! + '
            result = Math.floor(Math.random() * (die) + 1)
            result_string += result
            sum += result
        }  
    }

    result_string += ` + ${modifier} = ${sum + modifier}`

    return result_string
}