// EXPRESS
import { Router } from "express";
import { check } from "express-validator";

//MIDDLEWARES
import { validateCamps } from "./../middlewares/validate-camps";
import { validateTitle, validationLocationId } from "./location.validators";
import { validateDivisionId } from "../division/division.validators";

// CONTROLLERS
import {
  locationDelete,
  locationGet,
  locationGetById,
  locationPost,
  locationPut,
} from "./location.controllers";
import { validateJwt } from "../middlewares/validate-JWT";

// PATH /api/location
export const router = Router();

router.get("/", locationGet);
router.get(
  "/:id",
  [
    check("id", "Id isn't valid").isMongoId(),
    validateCamps,
    check("id")
      .custom(validationLocationId)
      .withMessage("It isn't location id valid"),
    validateCamps,
  ],
  locationGetById
);
router.post(
	'',
	[
		validateJwt,
		validateCamps,
		check('title', 'Title is required').notEmpty(),
		check('number', 'Number is required').notEmpty(),
		check('division', "It isn't a valid id").isMongoId(),
		check('description', 'Description need to be more than 20 char').isLength({
			min: 20,
		}),
		check('schedule', 'schedule is required').notEmpty(),
		validateCamps,
		check('title').custom(validateTitle).withMessage('The title is in used'),
		check('division')
			.custom(validateDivisionId)
			.withMessage("Division isn't valid "),
		check('number', 'Number need to be number').isNumeric(),
		validateCamps,
	],
	locationPost
);
router.put(
	'/:id',
	[
		validateJwt,
		validateCamps,
		check('id', "Id isn't valid").isMongoId(),
		check('id')
			.custom(validationLocationId)
			.withMessage("It isn't location id valid"),
		validateCamps,
		check('title', 'Title is required').notEmpty(),
		check('number', 'Number is required').notEmpty(),
		check('division', "It isn't a valid id").isMongoId(),
		check('description', 'Description need to be more than 20 char').isLength({
			min: 20,
		}),
		check('schedule', 'Schedule is required').notEmpty(),
		validateCamps,
		// check("title").custom(validateTitle).withMessage("The title is in used"),
		check('division')
			.custom(validateDivisionId)
			.withMessage("Division isn't valid "),
		check('number', 'Number need to be number').isNumeric(),
		validateCamps,
	],
	locationPut
);
router.delete(
	'/:id',

	[
		validateJwt,
		validateCamps,
		check('id', "Id isn't valid").isMongoId(),
		validateCamps,
		check('id')
			.custom(validationLocationId)
			.withMessage("It isn't location id valid"),
		validateCamps,
	],
	locationDelete
);
