// EXPRESS
import { Router } from 'express'
import { check } from 'express-validator'

// VALIDATORS
import { validateCategory } from './category.validators'
import { validateCamps } from '../../middlewares/validate-camps'

// CONTROLLERS
import {
    categoryDelete,
    categoryGet,
    categoryGetById,
    categoryGetCount,
    categoryPost,
    categoryPut,
} from './category.controllers'
import { validateUserJwt } from '../../middlewares/validate-user-JWT'
import { isAdminRole } from '../../middlewares/validate-admin-role'
import { clearCamps } from '../../middlewares/clear-camps'

// PATH /api/category
export const router = Router()

// ROUTES

// NO REGISTER
router.get('/', categoryGet)

// ADMIN
router.get(
    '/count',
    [
        validateUserJwt, isAdminRole
    ],
    categoryGetCount
)
router.get(
    '/:id',
    [
        validateUserJwt, isAdminRole,
        check('id', "it isn't a valid id").isMongoId(),
        validateCamps,
    ],
    categoryGetById
)
router.post(
    '',
    [
        validateUserJwt,
        isAdminRole,
        check('name', 'The name is required').notEmpty(),
        check('icon', 'The name is required').notEmpty(),

        check('name').custom(validateCategory),
        clearCamps(['state']),
        validateCamps,
    ],
    categoryPost
)
router.put(
    '/:id',
    [
        validateUserJwt,
        isAdminRole,
        check('id', "it isn't a valid id").isMongoId(),
        validateCamps,
        check('name', 'The name is required').notEmpty(),
        check('icon', 'The name is required').notEmpty(),

        validateCamps,
    ],
    categoryPut
)

router.delete(
    '/:id',
    [
        validateUserJwt,
        isAdminRole,
        check('id', "it isn't a valid id").isMongoId(),
        validateCamps,
    ],
    categoryDelete
)
