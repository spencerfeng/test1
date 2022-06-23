import { useContext } from "react";
import { SelectedAppointmentContext } from "../components/Root/Root";

export const useSelectedAppointmentContext = () => {
    const context = useContext(SelectedAppointmentContext);

    if (context === undefined)
        throw new Error(
            "You must use it inside the SelectedAppointmentContextProvider"
        );

    return context;
};
