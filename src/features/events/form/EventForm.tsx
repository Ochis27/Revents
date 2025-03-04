import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {Controller, FieldValues, useForm} from "react-hook-form";
import {Link, useNavigate, useParams} from "react-router-dom";
import {Button, Form, Header, Segment} from "semantic-ui-react";
import {useAppDispatch, useAppSelector} from "../../../app/store/store";
import {categoryOptions} from "./categotyOptions";

export default function EventForm() {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: {errors, isValid, isSubmitting},
  } = useForm({
    mode: "onTouched",
  });
  let {id} = useParams();
  const event = useAppSelector((state) =>
    state.events.events.find((e) => e.id === id)
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function onSubmit(data: FieldValues) {
    console.log(data);

    // id = id ?? createId();
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    // event
    //   ? dispatch(updateEvent({...event, ...values}))
    //   : dispatch(
    //       createEvent({
    //         ...values,
    //         id,
    //         hostedBy: "bob",
    //         attendees: [],
    //         hostPhotoURL: "",
    //       })
    //     );
    // navigate(`/events/${id}`);
  }

  return (
    <Segment clearing>
      <Header content="Event details" sub color="teal" />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Input
          placeholder="Event title"
          defaultValue={event?.title || ""}
          {...register("title", {required: true})}
          error={errors.title && "Title is required"}
        />
        <Controller
          name="category"
          control={control}
          rules={{required: "Category is required"}}
          defaultValue={event?.category}
          render={({field}) => (
            <Form.Select
              options={categoryOptions}
              clearable
              placeholder="Category"
              {...field}
              onChange={(_, d) =>
                setValue("category", d.value, {shouldValidate: true})
              }
              error={errors.category && errors.category.message}
            />
          )}
        />

        <Form.TextArea
          placeholder="Description"
          defaultValue={event?.description || ""}
          {...register("description", {required: "Description is required"})}
          error={errors.description && errors.description.message}
        />
        <Header sub content="Location details" color="teal" />
        <Form.Input
          placeholder="City"
          defaultValue={event?.city || ""}
          {...register("city", {required: "City is required"})}
          error={errors.city && errors.city.message}
        />

        <Form.Input
          placeholder="Venue"
          defaultValue={event?.venue || ""}
          {...register("venue", {required: "Venue is required"})}
          error={errors.venue && errors.venue.message}
        />

        <Form.Field>
          <Controller
            name="date"
            control={control}
            rules={{required: "Date is required"}}
            defaultValue={(event && new Date(event.date)) || null}
            render={({field}) => (
              <DatePicker
                selected={field.value}
                onChange={(value) =>
                  setValue("date", value, {shouldValidate: true})
                }
                showTimeSelect
                timeCaption="time"
                dateFormat="MMM d, yyyy h:mm aa"
                placeholderText="Event date and time"
              />
            )}
          />
        </Form.Field>

        <Button
          type="submit"
          floated="right"
          positive
          content="Submit"
          disabled={!isValid}
          loading={isSubmitting}
        />
        <Button
          as={Link}
          to="/events"
          type="submit"
          floated="right"
          content="Cancel"
          disabled={isSubmitting}
        />
      </Form>
    </Segment>
  );
}
