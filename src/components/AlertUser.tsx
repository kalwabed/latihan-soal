import React from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Alert } from 'reactstrap'

import { PropsAlert } from '../types'

const AlertUser: React.FC<PropsAlert> = ({
    wrong,
    wrongCount,
    MAX_WRONG,
    gameOver,
    userAnswer,
    number,
    isCorrect,
    TOTAL_QUESTION,
}) => {
    const alertDone = () => {
        const mySwal = withReactContent(Swal)

        mySwal
            .fire('Berhasil', 'Anda telah menyelesaikan dengan baik', 'success')
            .then(() => '')
    }

    return (
        <>
            {wrongCount < MAX_WRONG &&
                number + 1 === TOTAL_QUESTION &&
                isCorrect &&
                alertDone()}
            {wrongCount !== MAX_WRONG && wrongCount >= 1 && wrong && !gameOver && (
                <Alert color="danger" className="my-2">
                    Salah
                </Alert>
            )}

            {!wrong && !gameOver && userAnswer.length > number && (
                <Alert color="success" className="my-2">
                    Benar. Poin + 10
                </Alert>
            )}
        </>
    )
}

export default AlertUser
