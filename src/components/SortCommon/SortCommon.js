import React from 'react';
import { Dropdown } from 'react-bootstrap';
export default function SortCommon(props) {
  const { getInfoSort, sortBy } = props;

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Sort by
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => getInfoSort({ sortValue: 'asc', sortBy })}>
          Tăng dần
        </Dropdown.Item>
        <Dropdown.Item onClick={() => getInfoSort({ sortValue: 'desc', sortBy })}>
          Giảm dần
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
