export type Appointment = {
    id: number;
    brokerId: number;
    date: string;
};

export type SelectedAppointment = Appointment & {
    brokerName: string;
};

export type BrokerAppointments = {
    id: number;
    name: string;
    appointments: Appointment[];
}[];

export type BrokerType = {
    id: number;
    name: string;
};
