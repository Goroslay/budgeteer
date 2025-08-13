import { body } from 'express-validator'

export const createUserValidator = [
  body('fullname')
    .trim()
    .isLength({ min: 4, max: 120 }).withMessage('Invalid Name'),
  body('email')
    .isEmail().withMessage('Invalid email'),
  body('username')
    .trim()
    .matches(/^[a-zA-Z0-9._-]{3,30}$/).withMessage('Invalid Username'),
  body('country')
    .trim()
    .isLength({ min: 2 }).withMessage('Invalid country'),
  body('password')
    .trim()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._\-])[A-Za-z\d@$!%*?&._\-]{8,}$/, 'i')
    .withMessage('Invalid password')
]
