import { Router } from "express";
import { getUsers, getUser , createUser, getTypeUsers } from "../../controllers/users/usersController.js";

const router = Router();

router.get('/:email/:password', getUser);
router.get(`/all`, getUsers);
router.post('/', createUser);
router.get('/type', getTypeUsers);

export default router;