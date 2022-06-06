// EXPRESS
import { Router } from 'express';
export const router = Router();

// ROUTES
import { router as locationRoute } from './location/location.routes';
import { router as bookRoute } from './book/book.routes';

import { router as categoryRoute } from './category/category.routes';
import { router as userRoute } from './user/user.routes';

// PATH /api/v1/

router.use('/book', bookRoute);
router.use('/location', locationRoute);
router.use('/category', categoryRoute);
router.use('/user', userRoute);
