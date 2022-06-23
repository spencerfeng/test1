import { useEffect, useState } from "react";
import styled from "styled-components";
import { BROKERS_ENDPOINT, APPOINTMENTS_ENDPOINT } from "../../../constants";
import { useSelectedAppointmentContext } from "../../../hooks/useSelectedAppointmentContext";
import type { BrokerAppointments, BrokerType } from "../../../types";
import Broker from "./Broker";

const Wrapper = styled.div`
    display: flex;
`;

const SideBar = styled.div`
    width: 250px;
`;

const Heading = styled.strong.attrs({ role: "heading", level: 2 })`
    display: block;
    font-size: 20px;
`;

enum LOADING_STATUS {
    IDLE = "IDLE",
    LOADING = "LOADING",
    SUCCEEDED = "SUCCEEDED",
    FAILED = "FAILED",
}

const AppointmentSelect = () => {
    const [brokerAppointments, setBrokerAppointments] =
        useState<BrokerAppointments>([]);

    const [
        loadingBrokerAppointmentsStatus,
        setLoadingBrokerAppointmentsStatus,
    ] = useState(LOADING_STATUS.IDLE);

    const { selectedAppointment } = useSelectedAppointmentContext();

    useEffect(() => {
        if (loadingBrokerAppointmentsStatus === LOADING_STATUS.IDLE) {
            const loadBrokerAppointments = async () => {
                try {
                    const result = await fetch(BROKERS_ENDPOINT);

                    if (!result.ok) {
                        throw new Error("Failed to get brokers");
                    }

                    const brokers: [BrokerType] = await result.json();

                    const brokerAppointments = await Promise.all(
                        brokers.map(async (broker) => {
                            const fetchAppointmentResult = await fetch(
                                `${APPOINTMENTS_ENDPOINT}/${broker.id}`
                            );

                            if (!fetchAppointmentResult.ok) {
                                throw new Error(
                                    "Failed to get broker appointments"
                                );
                            }

                            const appointments =
                                await fetchAppointmentResult.json();

                            return { ...broker, appointments };
                        })
                    );

                    setBrokerAppointments(brokerAppointments);
                    setLoadingBrokerAppointmentsStatus(
                        LOADING_STATUS.SUCCEEDED
                    );
                } catch (err) {
                    throw new Error("Failed to get brokers and appointments");
                }
            };

            setLoadingBrokerAppointmentsStatus(LOADING_STATUS.LOADING);
            void loadBrokerAppointments().catch((err) => {
                console.log({ err });
                setLoadingBrokerAppointmentsStatus(LOADING_STATUS.FAILED);
            });
        }
    }, [loadingBrokerAppointmentsStatus]);

    return (
        <Wrapper>
            <SideBar>
                <Heading>Amazing site</Heading>
                TODO: populate brokers
                <ul>
                    {brokerAppointments.map((broker) => (
                        <Broker key={broker.id} broker={broker} />
                    ))}
                </ul>
            </SideBar>
            <div>
                <Heading>Appointment details</Heading>
                TODO: get appointment details when clicking on one from the left
                side
                {selectedAppointment && (
                    <>
                        <div>Appointment ID: {selectedAppointment.id}</div>
                        <div>Broker Name: {selectedAppointment.brokerName}</div>
                        <div>Appointment Date: {selectedAppointment.date}</div>
                    </>
                )}
            </div>
        </Wrapper>
    );
};

export default AppointmentSelect;
