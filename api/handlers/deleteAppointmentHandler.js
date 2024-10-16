import jwt from '../util/jsonwebtoken-promised.js'
import { CredentialsError } from 'com/errors.js'
import logic from '../logic/index.js'
const { JWT_SECRET } = process.env

export default (req, res, next) => {

    try {
        const token = req.headers.authorization.slice(7)

        jwt.verify(token, JWT_SECRET)
            .then(payload => {
                const { sub: userId } = payload

                const { appointmentId } = req.params

                try {
                    logic.deleteAppointment(userId, appointmentId)
                        .then(() => res.status(204).send())
                        .catch(error => next(error))
                } catch (error) {
                    next(error)
                }
            })
            .catch(error => next(new CredentialsError(error.message)))
    } catch (error) {
        next(error)
    }
}