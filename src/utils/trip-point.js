import dayjs from 'dayjs';

export const sortTripPointByDay = (pointA, pointB) => dayjs(pointB.dateFrom).diff(dayjs(pointA.dateFrom));

export const sortTripPointByTime = (pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointA.dateTo)) - dayjs(pointB.dateFrom).diff(dayjs(pointB.dateTo));

export const sortTripPointByPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

