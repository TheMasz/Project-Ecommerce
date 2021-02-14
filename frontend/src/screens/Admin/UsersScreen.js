import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, updateUser, userInfo, userList } from "../../actions/userActions";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import { USER_DELETE_RESET, USER_UPDATE_RESET } from "../../constants/userConstants";

export default function UsersScreen() {
  const dispatch = useDispatch();
  const [isModalDL, setModalDL] = useState(false);
  const [isModalED, setModalED] = useState(false);
  const listUser = useSelector((state) => state.userList);
  const { loading: LoadingUser, error: errorUser, users } = listUser;
  const DetailUser = useSelector((state) => state.userInfo);
  const productDelete = useSelector((state) => state.productDelete);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;
  const {
    loading: loadingDetailUser,
    error: errorDetailsUser,
    user,
  } = DetailUser;
  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    dispatch(userList());
    if (successDelete) {
      dispatch({ type: USER_DELETE_RESET });
    }
    if(successUpdate){
      dispatch({type: USER_UPDATE_RESET})
    }
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPassword(user.password);
    }
  }, [dispatch, successDelete, successUpdate ,user]);
  const CfdeleteHandler = (userId) => {
    setModalDL(true);
    dispatch(userInfo(userId));
  };
  const deleteHandler = (userId) => {
    setModalDL(false);
    dispatch(deleteUser(userId));
  };
  const CfupdateHandler = (userId) => {
    setModalED(true);
    dispatch(userInfo(userId));
  };
  const updateHandler = (userId) => {
    setModalED(false);
    const data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("password", password);
    dispatch(updateUser(userId, data));
  };
  return (
    <div className="container">
      {LoadingUser ? (
        <MessageBox variant="loading">Loading...</MessageBox>
      ) : errorUser ? (
        <MessageBox variant="danger">{errorUser}</MessageBox>
      ) : (
        <div className="table-list-section">
          {successDelete || successUpdate ? (
            <MessageBox variant="success">
              {successDelete || successUpdate}
            </MessageBox>
          ) : errorDelete || errorUpdate ? (
            <MessageBox variant="danger">
              {errorDelete || errorUpdate}
            </MessageBox>
          ) : loadingDelete || loadingUpdate ? (
            <MessageBox variant="loading">Loading...</MessageBox>
          ) : (
            ""
          )}
          <table className="table-section">
            <thead className="table-section__header">
              <tr>
                <th>ขื่อ</th>
                <th>อีเมล</th>
                <th>รหัสผ่าน</th>
                <th>วันที่สมัคร</th>
                <th>ดำเนินการ</th>
              </tr>
            </thead>
            <tbody className="table-section__body">
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td>{user.createdAt}</td>
                  <td>
                    <button
                      type="button"
                      className="edit "
                      onClick={() => CfupdateHandler(user._id)}
                    >
                      แก้ไข
                    </button>
                    <button
                      type="button"
                      className="delete"
                      onClick={() => CfdeleteHandler(user._id)}
                    >
                      ลบ
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {isModalDL && (
        <div className="modal">
          <div className="modal__mask" style={{ zIndex: 1000008 }}>
            <div className="modal__container">
              <div className="modal__box">
                <div className="modal__content">
                  {loadingDetailUser ? (
                    <MessageBox variant="loading">Loading...</MessageBox>
                  ) : errorDetailsUser ? (
                    <MessageBox variant="danger">{errorDetailsUser}</MessageBox>
                  ) : (
                    <>
                      <div className="modal__header">
                        <div className="modal__header-inner">
                          <span className="text-overflow">ลบผู้ใช้</span>
                        </div>
                      </div>
                      <div className="modal__body">
                        <div className="modal__body-inner-top">
                          <span className="text-overflow">
                            คุณแน่ใจหรือไม่ว่าจะลบผู้ใช้นี้?
                          </span>
                        </div>
                        <div className="modal__body-inner-bottom">
                          {user.avatar ? (
                            <img
                              src={`/uploads/users/${user.avatar}`}
                              alt={user.name}
                              className="modal__image"
                            />
                          ) : (
                            <div>ไม่มีรูปภาพของ </div>
                          )}

                          <div className="modal__name">
                            <span className="">{user.name}</span>
                          </div>
                        </div>
                      </div>
                      <div className="modal__footer">
                        <div className="modal__footer-buttons">
                          <button
                            type="button"
                            className="normal mx-1"
                            onClick={(e) => setModalDL(false)}
                          >
                            ยกเลิก
                          </button>
                          <button
                            type="button"
                            className="primary"
                            onClick={(e) => deleteHandler(user._id)}
                          >
                            ยืนยัน
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {isModalED && (
        <div className="modal">
          <div className="modal__mask" style={{ zIndex: 1000008 }}>
            <div className="modal__container">
              <div className="modal__box">
                <div className="modal__content">
                  {loadingDetailUser ? (
                    <MessageBox variant="loading">Loading...</MessageBox>
                  ) : errorDetailsUser ? (
                    <MessageBox variant="danger">{errorDetailsUser}</MessageBox>
                  ) : (
                    <>
                      <div className="modal__header">
                        <div className="modal__header-inner">
                          <span className="text-overflow">ลบผู้ใช้</span>
                        </div>
                      </div>
                      <div className="modal__body">
                        <div className="modal__body-inner-top">
                          <span className="text-overflow">
                            คุณแน่ใจหรือไม่ว่าจะแก้ไขผู้ใช้นี้?
                          </span>
                        </div>
                        <div className="modal__body-inner-bottom">
                          {user.avatar ? (
                            <img
                              src={`/uploads/users/${user.avatar}`}
                              alt={user.name}
                              className="modal__image"
                            />
                          ) : (
                            <div>ไม่มีรูปภาพของ </div>
                          )}

                          <div className="modal__name">
                            <span className="">{user.name}</span>
                          </div>
                        </div>
                        <div className="input-with-label">
                          <div className="input-with-label__label">
                            <label>ชื่อผู้ใช้</label>
                          </div>
                          <div className="input-with-label__content">
                            <input
                              type="text"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="input-with-label">
                          <div className="input-with-label__label">
                            <label>Email</label>
                          </div>
                          <div className="input-with-label__content">
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="input-with-label">
                          <div className="input-with-label__label">
                            <label>Password</label>
                          </div>
                          <div className="input-with-label__content">
                            <input
                              type="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="modal__footer">
                        <div className="modal__footer-buttons">
                          <button
                            type="button"
                            className="normal mx-1"
                            onClick={(e) => setModalED(false)}
                          >
                            ยกเลิก
                          </button>
                          <button
                            type="button"
                            className="primary"
                            onClick={(e) => updateHandler(user._id)}
                          >
                            ยืนยัน
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
