// import { User } from "raffle-server/src/interfaces/users.interface";
import { useEffect, useState } from "react";
import { Button } from "ui";
import { UsersProvider, useUsers } from "../contexts/UsersProvider";
import { createUser, deleteUser, getAllUsers, loginUser } from "../routes/Users";

export default function Users() {
  return (
    <UsersProvider>
      <AllUsers />
      <DeleteUsers />
      <AddUser />
      <LoginUser />
    </UsersProvider>
  );
}

function AllUsers() {
  const [users, setUsers] = useUsers();
  return (
    <div>
      <button
        onClick={() => {
          getAllUsers().then((res) => {
            setUsers(res.AllUsers);
          });
        }}
      >
        Get All Users
      </button>
      <ul>
        {users.map((user: any) => (
          <li key={user.id}>
            <ul>
              <li> id: {user.id}</li>
              <li> email: {user.email}</li>
            </ul>
          </li>
        ))}
      </ul>
      <Button />
    </div>
  );
}

function DeleteUsers() {
  const [id, setId] = useState<number>();
  const [users, setUsers] = useUsers();
  return (
    <div>
      <input
        type="number"
        placeholder="User ID"
        onChange={(e) => {
          setId(parseInt(e.target.value));
        }}
      />
      <button
        onClick={() => {
          if (id)
            deleteUser(id)
              .then((res) => {
                getAllUsers().then((res) => {
                  setUsers(res.AllUsers);
                });
                console.log(res);
              })
              .catch((e) => {
                console.error(e);
              });
        }}
      >
        Delete User
      </button>
    </div>
  );
}

function AddUser() {
  const [users, setUsers] = useUsers();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  return (
    <div>
      <input onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email" />
      <input onChange={(e) => setPassword(e.target.value)} type="text" placeholder="Password" />
      <button
        onClick={() => {
          if (email && password)
            createUser(email, password).then((res) => {
              getAllUsers().then((res) => {
                setUsers(res.AllUsers);
              });
              console.log(res);
            });
        }}
      >
        Add User
      </button>
    </div>
  );
}

function LoginUser() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  return (
    <div>
      <input onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email" />
      <input onChange={(e) => setPassword(e.target.value)} type="text" placeholder="Password" />
      <button
        onClick={() => {
          if (email && password)
            loginUser(email, password).then((res) => {
              console.log(res);
            });
        }}
      >
        Login User
      </button>
    </div>
  );
}