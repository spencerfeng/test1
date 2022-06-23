import { Router } from "express";

import appointments from "./appointments";
import brokers from "./brokers";

const router = Router();

router.use("/appointments", appointments);
router.use("/appointments/:brokerId", appointments);

router.use("/brokers", brokers);

export default router;
