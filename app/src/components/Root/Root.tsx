import React, { useState } from "react";
import styled from "styled-components";

import Navigation from "./Navigation";
import AppointmentSelect from "./AppointmentSelect";
import { SelectedAppointment } from "../../types";

const Wrapper = styled.div`
    background-color: #fcfcfc;
    height: 100%;
    width: 100%;
`;

const Content = styled.div`
    margin: 0 auto;
    padding: 24px;
    width: 720px;
    box-shadow: 1px 1px 4px #d3d3d3;
    background-color: white;
    border-radius: 5px;
`;

const Heading = styled.strong.attrs({ role: "heading", level: 1 })`
    display: block;
    font-size: 36px;
    margin-bottom: 40px;
    margin-top: 20px;
`;

type ProviderProps = {
    children: React.ReactNode;
};

type SelectedAppointmentContextType =
    | {
          selectedAppointment: SelectedAppointment | null;
          setSelectedAppointment: React.Dispatch<
              React.SetStateAction<SelectedAppointment | null>
          >;
      }
    | undefined;

export const SelectedAppointmentContext =
    React.createContext<SelectedAppointmentContextType>(undefined);

const SelectedAppointmentContextProvider = ({ children }: ProviderProps) => {
    const [selectedAppointment, setSelectedAppointment] =
        useState<SelectedAppointment | null>(null);

    const value = { selectedAppointment, setSelectedAppointment };

    return (
        <SelectedAppointmentContext.Provider value={value}>
            {children}
        </SelectedAppointmentContext.Provider>
    );
};

const Root = () => {
    return (
        <Wrapper>
            <SelectedAppointmentContextProvider>
                <Navigation />
                <Content>
                    <Heading>Amazing site</Heading>
                    <AppointmentSelect />
                </Content>
            </SelectedAppointmentContextProvider>
        </Wrapper>
    );
};

export default Root;
