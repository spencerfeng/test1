import { screen, render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import * as selectedAppointmentContext from "../../../../hooks/useSelectedAppointmentContext";

import Broker from "./Broker";

const testBroker = {
    name: "bob",
    id: 1,
    appointments: [{ brokerId: 1, date: "24/11/2021", id: 1 }],
};

describe("Broker Component", () => {
    test("should hide and show appointments on button click", () => {
        jest.spyOn(
            selectedAppointmentContext,
            "useSelectedAppointmentContext"
        ).mockReturnValue({
            selectedAppointment: null,
            setSelectedAppointment: jest.fn(),
        });

        render(<Broker broker={testBroker} />);

        // default
        expect(
            screen.getByTestId("broker-appointments-list")
        ).toBeInTheDocument();

        // hide
        const hideAppointmentsButton = screen.getByTestId(
            "broker-hide-appointments-button"
        );

        fireEvent.click(hideAppointmentsButton);

        expect(
            screen.queryByTestId("broker-appointments-list")
        ).not.toBeInTheDocument();

        // show
        const showAppointmentsButton = screen.getByTestId(
            "broker-show-appointments-button"
        );

        fireEvent.click(showAppointmentsButton);

        expect(
            screen.getByTestId("broker-appointments-list")
        ).toBeInTheDocument();
    });
});
