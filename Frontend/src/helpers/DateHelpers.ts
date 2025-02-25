import { DateTime } from "luxon";

export function DisplayDate(date: string): string {
    return DateTime.fromISO(date).toLocaleString({
        month: "short",
        day: "2-digit",
        year: "numeric",
    });
}

export function DisplayTime(date: string): string {
    return DateTime.fromISO(date).toLocaleString({
        hour: "2-digit",
        minute: "2-digit",
    });
}
