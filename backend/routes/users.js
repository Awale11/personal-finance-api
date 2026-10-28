import express from 'express';
import { getUsers, createUser, updatedUser, deleteUser, getUserInfo }  from '../controllers/users.js';

const router = express.Router();


router.get('/', getUsers);

router.get('/:id', getUserInfo)

router.post('/create', createUser);

router.put('/update/:id', updatedUser);

router.delete('/delete/:id', deleteUser)


export default router;


