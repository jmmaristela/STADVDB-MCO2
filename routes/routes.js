// routes.js
import { Router } from 'express';

const router = Router();

router.get('/view', (req, res) => {
    res.render('view');
});

router.get('/', (req, res) => {
    res.render('index');
});

export default router;
