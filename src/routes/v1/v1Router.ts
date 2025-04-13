import express from 'express';
import { validate } from '../../utils/validators/joiValidator';
import { documentSchema } from '../../utils/validators/documentSchema';
import { createDocumentController } from '../../controllers/documentController';
const router = express.Router();
router.post('/documents', validate(documentSchema), createDocumentController);
router.get('/documents', (req, res) => {
  res.status(200).json({ message: 'GET documents' });
})
export default router;