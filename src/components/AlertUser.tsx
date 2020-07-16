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
    name,
}) => {
    const alertDone = () => {
        const mySwal = withReactContent(Swal)

        mySwal
            .fire(
                'Berhasil',
                `Selamat ${name}, anda telah menyelesaikan dengan baik`,
                'success'
            )
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
                <div className="my-2">
                    {number + 1 === TOTAL_QUESTION ? (
                        <Alert color="primary">Selesai</Alert>
                    ) : (
                        <Alert color="success">Benar. Poin + 10</Alert>
                    )}
                </div>
            )}

            {wrongCount === MAX_WRONG && (
                <Alert color="danger" className="my-2">
                    Hampir saja... oke, ulang dari awal
                </Alert>
            )}
        </>
    )
}

export default AlertUser
