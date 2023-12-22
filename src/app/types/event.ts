export type AppEvent = {
  [x: string]: any;
  id: string;
  title: string;
  date: string;
  description: string;
  city: string;
  venue: string;
  hostedBy: string;
  hostPhoto: string;
  attendees: Attendee[];
};

export type Attendee = {
  id: string;
  name: string;
  photoURL: string;
};
