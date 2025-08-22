import cuid from 'cuid'
import { body, param } from 'express-validator'

const { isCuid } = cuid
export const registerUserValidator = [
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
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._\-])[A-Za-z\d@$!%*?&._\-]{8,}$/)
    .withMessage('Password must be at least 8 characters long and include uppercase, lowercase, number, and special character')
]

export const loginUserValidator = [
  body('email')
    .optional()
    .isEmail().withMessage('Invalid email'),
  body('username')
    .optional()
    .trim()
    .matches(/^[a-zA-Z0-9._-]{3,30}$/).withMessage('Invalid Username'),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required'),
  body()
    .custom((value, { req }) => {
      if (!req.body.email && !req.body.username) {
        throw new Error('Either email or username is required')
      }
      return true
    })
]

export const updateUserValidator = [
  body('username')
    .optional()
    .trim()
    .matches(/^[a-zA-Z0-9._-]{3,30}$/).withMessage('Invalid Username'),
  body('fullname')
    .optional()
    .trim()
    .isLength({ min: 4, max: 120 }).withMessage('Invalid Name'),
  body('email')
    .optional()
    .isEmail().withMessage('Invalid email'),
  body('country')
    .optional()
    .trim()
    .isLength({ min: 2 }).withMessage('Invalid country')
]

export const idValidator = [
  param('id')
    .custom((value) => {
      if (!isCuid(value)) {
        throw new Error('Invalid ID')
      }
      return true
    })
]
