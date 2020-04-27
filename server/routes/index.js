import express, { Router } from 'express';
import path from 'path';

import controllers from '../controllers';

const router = Router();

router.post('/api/add-board', controllers.addBoard)
router.get('/api/fetch-board', controllers.fetchBoard)
router.delete('/api/delete-board/:boardId', controllers.deleteBoard)
router.post('/api/add-page', controllers.addPage)
router.delete('/api/delete-page/:boardId/:pageId', controllers.deletePage)
router.post('/api/clear-page/:boardId/:pageId', controllers.clearPage)
router.post('/api/change-board-name/:boardId', controllers.changeBoardName)
router.post('/api/change-board-img/:boardId', controllers.changeBoardImg)


router.use(express.static(path.resolve(__dirname, '..', 'dist')));

router.get('*', (req, res) =>
  res.sendFile(path.resolve(__dirname, '..', 'dist', 'index.html'))
);

router.use('*', (req, res) =>
  res.status(404).send({ message: 'no api handling' })
);

export default router;
