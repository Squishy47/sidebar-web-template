import { create } from "zustand";
import { CreateEvent } from "../types";
import { EventForm } from "../pages/Checkout/CreateEvent";

type EventFormInput = Pick<EventForm, "name" | "start_time" | "end_time"> &
  Pick<CreateEvent, "user_id">;

type CreateEventStore = {
  event: CreateEvent | null;
  setEvent: (event: EventFormInput) => void;
  reset: () => void;
};

const useCreateEventStore = create<CreateEventStore>((set) => ({
  event: null,
  setEvent: (state: EventFormInput) => {
    const event = {
      ...state,
      start_time: new Date(state.start_time).toISOString(),
      end_time: new Date(state.end_time).toISOString(),
    };

    set({ event });
  },
  reset: () => set({ event: null }),
}));

export { useCreateEventStore };
