import errors, { SystemError } from 'com/errors'
import validate from 'com/validate'

const getAllAppointments = () => {

    return fetch(`${import.meta.env.VITE_API_URL}/appointments`, {
        method: 'GET',

        headers: {
            Authorization: `Bearer ${sessionStorage.token}`
        }
    })
        .catch(() => { throw new SystemError('server error') })
        .then(response => {
            if (response.status === 200) {
                return response.json()
                    .catch(() => { throw new SystemError('server error') })
                    .then(appointments => appointments)
            }

            return response.json()
                .catch(() => { throw new SystemError('server error') })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}

export default getAllAppointments
