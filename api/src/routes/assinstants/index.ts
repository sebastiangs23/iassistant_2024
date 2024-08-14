import { Router } from "express";
import { getAssistantsUser, createAssistant, askAssistant, updateAssistant, deleteAssistant } from "../../controllers/assistants/assistantsController.js";

const router = Router();

router.get("/:id_user", getAssistantsUser);
router.post("/", createAssistant);
router.post('/chat', askAssistant);
router.put('/update', updateAssistant);
router.delete('/delete/:_id', deleteAssistant);

export default router;