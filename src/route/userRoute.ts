import express from 'express';
import {createUser, deleteUserById, getAllUsers, getUserById, updateUserById} from '../controller/User';

const router = express.Router();

router.get('/', getAllUsers);
router.post('/signup', createUser);
router.get('/get/:id', getUserById);
router.put('/update/:id', updateUserById);
router.delete('/delete/:id', deleteUserById);

// ... export statement ...


export default router;
