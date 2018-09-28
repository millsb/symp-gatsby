import React, { Component } from 'react';
import styled from 'react-emotion';
import { COLORS, Heading, InnerContainer } from '../common';
import EventDetail from './EventDetail';
import EventStub from './EventStub';

const Well = styled('section')`
  background-color: ${COLORS.seafoam.fade(0.85).string()};
  padding: 1.6rem 1.6rem;
`;

export default class UpcomingEvents extends Component {
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

