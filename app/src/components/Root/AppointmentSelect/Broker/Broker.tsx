import React, { useContext, useState } from "react";
import { useSelectedAppointmentContext } from "../../../../hooks/useSelectedAppointmentContext";

export interface BrokerProps {
    broker: {
        name: string;
        id: number;
        appointments: { id: number; brokerId: number; date: string }[];
    };
}

const getToggleButtonTestId = (isHidden: boolean) =>
    `broker-${isHidden ? "show" : "hide"}-appointments-button`;

const Broker = ({ broker }: BrokerProps) => {
    const { setSelectedAppointment } = useSelectedAppointmentContext();

    const [areAppointmentsHidden, setAreAppointmentsHidden] = useState(false);

    return (
        <li>
            {broker.name}
            <br />
            appointments:
            <button
                onClick={() => setAreAppointmentsHidden(!areAppointmentsHidden)}
                data-testid={getToggleButtonTestId(areAppointmentsHidden)}
            >
                Hide appointments
            </button>
            {broker.appointments.length > 0 && !areAppointmentsHidden && (
                <>
                    <ul data-testid="broker-appointments-list">
                        {broker.appointments.map((appointment) => (
                            <li key={appointment.id}>
                                <button
                                    onClick={() =>
                                        setSelectedAppointment({
                                            ...appointment,
                                            brokerName: broker.name,
                                        })
                                    }
                                >
                                    {appointment.date}
                                </button>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </li>
    );
};

export default Broker;
