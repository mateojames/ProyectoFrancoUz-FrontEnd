import { LOADAPPOINTMENTS } from "./loadAppointments";
export const filterData = (data) => {
    console.log('DATA FILTERED ACTION ',data)
    return {type: LOADAPPOINTMENTS, appointments: data}
};