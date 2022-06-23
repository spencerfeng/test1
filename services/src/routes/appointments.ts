import { Router } from "express";

const appointments = [
    { id: 1, brokerId: 1, date: "15/10/2021" },
    { id: 2, brokerId: 3, date: "22/11/2021" },
    { id: 3, brokerId: 3, date: "23/11/2021" },
    { id: 4, brokerId: 4, date: "10/5/2021" },
];

const router = Router();

export default router;

router.get("/", (req, res) => {
    res.send(appointments);
});

router.get("/:brokerId", (req, res) => {
    res.send(
        appointments.filter(
            (appointment) =>
                appointment.brokerId === Number(req.params.brokerId)
        )
    );
});
