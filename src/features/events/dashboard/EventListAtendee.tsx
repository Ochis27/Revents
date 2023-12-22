import React from "react";
import {Image, List} from "semantic-ui-react";
import {Attendee} from "../../../app/types/event";

type Props = {
  attendee: Attendee;
};

export default function EventListAtendee({attendee}: Props) {
  return (
    <List.Item>
      <Image size="mini" circular key={attendee.id} src={attendee.photoURL} />
    </List.Item>
  );
}
