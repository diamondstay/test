import React, { useState, useEffect, useCallback } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import styles from './users.less';
import userApi from '../network/api/userApi';
import Row from '../components/Table/Row/Row';
import _ from 'lodash';
import ModalAction from '../components/Table/ModalAction/ModalAction';
import SortCommon from '../components/SortCommon/SortCommon';
import FilterCommon from '../components/FilterCommon/FilterCommon';

export default function Users() {
  const [data, setData] = useState([]);
  const [userIdEditing, setUserIdEditing] = useState(null);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [filter, setFilter] = useState({});

  let history = useHistory();
  let location = useLocation();

  useEffect(() => {
    setLoading(true);
    const fetchAallUser = async () => {
      try {
        const params = {
          _sort: filter.sortBy,
          _order: filter.sortValue,
          gender: filter.gender,
        };
        const res = await userApi.getAllUser(params);

        setData(res);
        setLoading(false);
        history.push(`${location.pathname}?${queryString.stringify(params)}`);
      } catch (error) {
        console.log('Fail to fetch :====>', error);
      }
    };
    fetchAallUser();
  }, [filter]);

  const getUserUpdated = user => {
    const indexUserUpdated = _.findIndex(data, item => item.id == user.id);
    if (indexUserUpdated != -1) {
      data[indexUserUpdated] = user;
    }
    setData(data);
  };

  const deleteById = useCallback(id => {
    userApi.deleteUserById(id);
    setData(data => data.filter(item => item.id !== id));
  }, []);

  const handleShow = useCallback(userId => {
    setShow(true);
    setUserIdEditing(userId);
  }, []);

  const handleClose = () => {
    setShow(false);
  };

  const handleClick = useCallback(value => {
    setIsEdit(value);
  }, []);

  const getNewUser = user => {
    setData([...data, user]);
  };

  const getInfoSort = info => {
    if (info.sortBy === 'age') {
      setFilter({
        ...filter,
        sortBy: info.sortBy,
        sortValue: info.sortValue,
      });
    }
  };

  const getInfoFilter = info => {
    if (info.filterBy === 'gender') {
      setFilter({
        ...filter,
        gender: info.filterValue,
      });
    }
  };

  return (
    <div className={styles.container}>
      <Button
        variant="success"
        className="mb-3 btn-add"
        onClick={() => {
          setShow(true);
          setIsEdit(false);
        }}
      >
        ADD USER
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>stt</th>
            <th> Name</th>
            <th>
              Age
              <SortCommon getInfoSort={getInfoSort} sortBy="age" />
            </th>
            <th>Address</th>
            <th>
              Gender
              <FilterCommon
                title="lọc theo giới tính"
                listSelect={['male', 'female']}
                getInfoFilter={getInfoFilter}
                filterBy="gender"
              />
            </th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {!loading ? (
            data.map(item => {
              return (
                <Row
                  item={item}
                  key={item.id}
                  deleteById={deleteById}
                  handleShow={handleShow}
                  handleClick={handleClick}
                />
              );
            })
          ) : (
            <div>Loading</div>
          )}
        </tbody>
      </Table>
      <ModalAction
        show={show}
        handleClose={handleClose}
        data={data}
        userIdEditing={userIdEditing}
        getUserUpdated={getUserUpdated}
        isEdit={isEdit}
        getNewUser={getNewUser}
      />
    </div>
  );
}
