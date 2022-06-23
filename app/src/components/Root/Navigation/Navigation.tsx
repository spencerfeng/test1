import React from "react";
import styled from "styled-components";
import { useSelectedAppointmentContext } from "../../../hooks/useSelectedAppointmentContext";

const Wrapper = styled.div`
    background-color: #e7e7e7;
    display: flex;
    font-size: 20px;
    justify-content: space-between;
    padding: 24px 48px;
    box-shadow: 1px 1px 1px #b8b8b8;
    margin-bottom: 48px;
`;

const Navigation = () => {
    const { selectedAppointment } = useSelectedAppointmentContext();

    if (selectedAppointment) {
        return (
            <Wrapper>
                <strong>
                    Currently selected appointment: {selectedAppointment.date}{" "}
                    with {selectedAppointment.brokerName}
                </strong>
                <strong>Welcome to Lendi</strong>
            </Wrapper>
        );
    }

    return null;
};

export default Navigation;
