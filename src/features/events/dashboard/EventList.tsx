import React from "react";
import EventListItem from "./EventListItem";
import {AppEvent} from "../../../app/types/event";

type Props = {
  events: AppEvent[];
};

export default function EventList({events}: Props) {
  return (
    <>
      {events.map((event: any) => (
        <EventListItem key={event.id} event={event} />
      ))}
    </>
  );
}
