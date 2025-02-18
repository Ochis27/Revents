import {useEffect, useState} from "react";
import {Grid} from "semantic-ui-react";
import {sampleData} from "../../../app/api/sampleData";
import {AppEvent} from "../../../app/types/event";
import EventForm from "../form/EventForm";
import EventList from "./EventList";

type Props = {
  formOpen: boolean;
  setFormOpen: (value: boolean) => void;
  selectedEvent: AppEvent | null;
  selectEvent: (event: AppEvent | null) => void;
};

export default function EventDashboard({
  formOpen,
  setFormOpen,
  selectEvent,
  selectedEvent,
}: Props) {
  const [events, setEvents] = useState<AppEvent[]>([]);

  useEffect(() => {
    setEvents(sampleData);
  }, []);

  function addEvent(event: AppEvent) {
    setEvents((prevState) => {
      return [...prevState, event];
    });
  }

  function updateEvent(updatedEvent: AppEvent) {
    setEvents(
      events.map((evt) => (evt.id === updatedEvent.id ? updatedEvent : evt))
    );
    selectEvent(null);
    setFormOpen(false);
  }

  function deleteEvent(eventId: string) {
    setEvents(events.filter((evt) => evt.id !== eventId));
  }

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList
          selectEvent={selectEvent}
          events={events}
          deleteEvent={deleteEvent}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        {formOpen && (
          <EventForm
            key={selectedEvent ? selectedEvent.id : "create"}
            selectedEvent={selectedEvent}
            setFormOpen={setFormOpen}
            addEvent={addEvent}
            updateEvent={updateEvent}
          />
        )}
      </Grid.Column>
    </Grid>
  );
}
