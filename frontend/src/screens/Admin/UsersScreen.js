import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userList } from "../../actions/userActions";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";

export default function UsersScreen() {
  const dispatch = useDispatch();
  const listUser = useSelector((state) => state.userList);
  const { loading: LoadingUSer, error: errorUser, users } = listUser;
  useEffect(() => {
    dispatch(userList());
  }, [dispatch]);

  return (
    <div className="container">
      {LoadingUSer ? (
        <LoadingBox />
      ) : errorUser ? (
        <MessageBox variant="danger">{errorUser}</MessageBox>
      ) : (
        <div className="table-list-section">
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
                    <button type="button" className="primary">
                      แก้ไข
                    </button>
                    <button type="button" className="primary">
                      ลบ
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
