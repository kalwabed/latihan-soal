import { Difficulty, Question } from './types'
import { shuffleArray } from './utils'

const FetchQuizQuestions = async (
    difficulty: Difficulty,
    TOTAL_QUESTION?: number
): Promise<any> => {
    const endpoint = `https://opentdb.com/api.php?amount=${TOTAL_QUESTION}&difficulty=${difficulty}&type=multiple`
    const data = await (await fetch(endpoint)).json()
    return data.results.map((qs: Question) => ({
        ...qs,
        answers: shuffleArray([...qs.incorrect_answers, qs.correct_answer]),
    }))
}

export default FetchQuizQuestions
