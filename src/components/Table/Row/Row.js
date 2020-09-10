import React, { useMemo } from 'react';
import { Button } from 'react-bootstrap';
function Row(props) {
  console.log('render-con');
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  const { item, deleteById, handleShow, handleClick } = props;
  return (
    <tr>
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>{item.age}</td>
      <td>{item.address}</td>
      <td>{item.gender}</td>
      <td>
        <Button
          variant="primary"
          onClick={() => {
            handleShow(item.id);
            handleClick(true);
          }}
        >
          Edit
        </Button>{' '}
        <Button variant="warning" onClick={() => deleteById(item.id)}>
          delete
        </Button>
      </td>
    </tr>
  );
}

function RowMemo(props) {
  return useMemo(
    () => (
      <Row
        item={props.item}
        deleteById={props.deleteById}
        handleShow={props.handleShow}
        handleClick={props.handleClick}
      />
    ),
    [props.item, props.deleteById, props.handleShow, props.handleClick],
  );
}
export default RowMemo;

//
