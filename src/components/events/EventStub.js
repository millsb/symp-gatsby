import React from 'react';
import styled from 'react-emotion';
import { COLORS } from '../common';

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
  const dateFormatOptions = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  };
  const formattedDate = new Date(date).toLocaleDateString(
    'en-US',
    dateFormatOptions
  );
  return (
    <aside
      onClick={() => onSelect(eventId)}
      css={`

        background-color: ${
          isSelected ? COLORS.lapis.fade(0.2).string() : 'transparent'
        };
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
      <TagList>
        {tags.map((tag, i) => (
          <Tag key={i}>{tag.title.rendered}</Tag>
        ))}
      </TagList>
    </aside>
  );
};

export default EventStub;
