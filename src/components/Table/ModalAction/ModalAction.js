import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import _ from 'lodash';
import userApi from '../../../network/api/userApi';

export default function ModalAction(props) {
  console.log('render----modal');
  const { show, handleClose, data, userIdEditing, getUserUpdated, isEdit, getNewUser } = props;
  const [userId, setUserId] = useState(null);
  const [name, setName] = useState('');
  const [age, setAge] = useState();
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');

  const clearForm = () => {
    setUserId('');
    setName('');
    setAge('');
    setAddress('');
    setGender('');
  };

  useEffect(() => {
    if (show && isEdit) {
      const user = _.find(data, item => item.id == userIdEditing);
      setUserId(user.id);
      setName(user.name);
      setAge(user.age);
      setAddress(user.address);
      setGender(user.gender);
    } else {
      clearForm();
    }
  }, [show]);

  const onSave = async () => {
    const data = {
      name: name,
      age: parseInt(age),
      address: address,
      gender: gender,
    };
    if (userId !== '') {
      const res = await userApi.updateUserById(userIdEditing, data);
      getUserUpdated(res);
      clearForm();
    } else {
      const res = await userApi.addOneUser(data);
      getNewUser(res);
      clearForm();
    }

    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{isEdit ? 'Sửa' : 'Thêm'} thành viên</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            placeholder="input name"
            className="mb-3"
            value={name}
            onChange={e => setName(e.target.value)}
            name="name"
          />
          <Form.Control
            placeholder="input age"
            className="mb-3"
            value={age}
            onChange={e => setAge(e.target.value)}
            name="age"
          />
          <Form.Control
            placeholder="input address"
            className="mb-3"
            value={address}
            onChange={e => setAddress(e.target.value)}
            name="address"
          />
          <Form.Control
            placeholder="input gender"
            value={gender}
            onChange={e => setGender(e.target.value)}
            name="gender"
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
