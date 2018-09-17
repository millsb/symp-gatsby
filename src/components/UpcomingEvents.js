import React, { Component } from 'react';
import * as R from "ramda";
import styled from 'react-emotion';
import { COLORS, Heading, InnerContainer } from './common';
import Link from "gatsby-link";
import slugify from "slugify";

const Well = styled('section')`
  background-color: ${COLORS.seafoam.fade(0.85).string()};
  padding: 1.6rem 1.6rem;
`;

const TagList = styled('ul')`
  display: flex;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const Tag = styled('li')`
  font-size: 0.6rem;
  font-weight: 700;
  padding-right: 0.25rem;
  text-transform: uppercase;
  margin-right: 0.8rem;
  margin-bottom: 0;
  line-height: 1;
  color: ${COLORS.awesome.string()};
`;

const EventStub = ({
  eventId,
  title,
  date,
  location,
  summary,
  tags,
  onSelect,
  isSelected,
}) => {
  const dateFormatOptions = { weekday: "short", month: "short", day: "numeric" };
  const formattedDate = new Date(date).toLocaleDateString("en-US", dateFormatOptions);
  return (
    <aside
      onClick={() => onSelect(eventId)}
      css={`

        background-color: ${isSelected ? COLORS.lapis.fade(0.2).string() : 'transparent'};
        color: ${isSelected ? '#fff' : COLORS.black.string()};
        padding: 1rem;
        cursor: pointer;

        li {
        color: ${isSelected ? '#fff !important' : COLORS.awesome.string()};

      `}
    >
      <header>
        <h3
          css={`
            font-size: 0.6rem;
            margin-bottom: 0.25rem;
            font-weight: 600;
            text-transform: uppercase;
          `}
        >
          {formattedDate} - {location}
        </h3>
        <h4
          css={`
            font-size: 0.9rem;
            margin-bottom: 0;
          `}
        >
          {title}
        </h4>
      </header>
      <p
        css={`
          font-size: 0.7rem;
          margin-bottom: 0.4rem;
        `}
      >
        {summary}
      </p>
      <TagList>{tags.map((tag, i) => <Tag key={i}>{tag.title.rendered}</Tag>)}</TagList>
    </aside>
  );
};

const EventDetail = ({
  eventId,
  title,
  slug,
  date,
  location,
  venue,
  summary,
  tags,
  mentors,
  description,
}) => {
  const mentorNames = mentors.targetItems.map(v => `${v.firstName.rendered} ${v.lastName.rendered}`);
  const truncatedDescription =  `${R.take(70, R.split(" ", description.rendered)).join(" ")}...`;
  const eventPath = slugify(title.rendered);

  return (
    <article
      css={`
        height: 100%;
        padding: 1rem 3rem;
        background-color: #fff;
        box-shadow: 6px 6px 20px #ccc;
      `}
    >
      <h4 css={`
        font-size: 1.6rem;
        padding:
      `}>{title.rendered}</h4>
      <p css={`
        font-size: 12px;
        margin-bottom: 0.6rem;
        text-transform: uppercase;
        color: #999;
        line-height: 1.4;
      `}>{venue.rendered}</p>
      <p css={`
        font-size: 14px;
        line-height: 1.4;
        color: #999;
        font-style: italic;
        margin-bottom: 0.5rem;
      `}>Hosted By {mentorNames.join(', ')}</p>
      <p css={`
       font-size: 14px;
       margin-bottom: 1.6rem;
      `}>{truncatedDescription}</p>
      <Link to={`/events/${eventPath}`} css={`
        background-color: ${COLORS.awesome.string()};
        display: block;
        padding: 0.6rem 0.8rem;
        font-size: 0.9rem;
        width: 40%;
        margin: 0 auto;
        color: #fff;
        text-decoration: none;
        text-transform: uppercase;
        text-align: center;
        font-weight: 700;
        transition: background-color 0.2s ease-out;

        &:hover {
          background-color: ${COLORS.lapis.string()};
        }
      `}>More Info</Link>
    </article>
  );
};

class UpcomingEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedEvent: this.props.events[0].id,
    };

    this.handleSelectedEvent = this.handleSelectedEvent.bind(this);
  }

  handleSelectedEvent(eventId) {
    this.setState({ selectedEvent: eventId });
  }

  render() {
    const { events } = this.props;
    const selectedEvent = this.props.events.filter(
      event => event.id === this.state.selectedEvent
    )[0];
    return (
      <React.Fragment>
        <Well>
          <InnerContainer>
            <Heading align={'left'}>
              Upcoming Sessions. <span>Find an event near you.</span>
            </Heading>
          </InnerContainer>
          <InnerContainer>
            <div
              css={`
                width: 50%;
                margin-right: 3%;
                overflow: auto;
                max-height: 470px;
              `}
            >
              {events.map((event, i) => (
                <EventStub
                  key={i}
                  eventId={event.id}
                  isSelected={event.id === this.state.selectedEvent}
                  onSelect={this.handleSelectedEvent}
                  date={event.date.rendered}
                  location={event.venue.rendered}
                  title={event.title.rendered}
                  tags={event.tags.targetItems}
                  summary={event.summary.rendered}
                />
              ))}
            </div>
            <div
              css={`
                width: 50%;
              `}
            >
              {selectedEvent && (
                <EventDetail {...selectedEvent} />
              )}
            </div>
          </InnerContainer>
        </Well>
      </React.Fragment>
    );
  }
}

export default UpcomingEvents;
