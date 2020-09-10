import React from 'react';
import { Form } from 'react-bootstrap';
export default function FilterCommon(props) {
  const { listSelect, getInfoFilter, filterBy } = props;

  return (
    <Form.Group controlId="exampleForm.ControlSelect1">
      <Form.Control
        as="select"
        onChange={e => getInfoFilter({ filterValue: e.target.value, filterBy })}
      >
        <option>{'select to filter'}</option>
        {listSelect.map(item => {
          return <option value={item}>{item}</option>;
        })}
      </Form.Control>
    </Form.Group>
  );
}
