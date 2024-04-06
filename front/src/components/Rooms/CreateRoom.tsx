import React, { FC } from "react";
import { seekuser } from "../../store/reducers/seekUsersSlice";
import Input from "../Input/input";
import Button from "../Button/button";

interface createRoomProps {
  seekUsers: seekuser[];
  selectedUsersList: { firstName: string }[];
  selectUser(name: string): void;
  title: string;
  handleChange(e: React.ChangeEvent<HTMLInputElement>): void;
  createRoom(): void;
  buttonDisabled: boolean;
}
const CreateRoom: FC<createRoomProps> = ({
  seekUsers,
  selectedUsersList,
  selectUser,
  title,
  handleChange,
  createRoom,
  buttonDisabled
}) => {
  return (
    <div role={"popUp"}>
      <Input
        className='titleRoom'
        name='title'
        placeholder='title'
        value={title}
        onChange={handleChange}
      />
      <div role={"users"}>
        {seekUsers.map(({ email }) => {
          return <p
            key={email}
            className={
              selectedUsersList.some((user) => user.firstName === email)
                ? "active"
                : "selectUser"
            }
            onClick={() => selectUser(email)}
          >
            {email}
          </p>
        }
        
        )}
      </div>
      <Button
        label='Create Room'
        role='createRoomButton'
        type='button'
        className='createRoom'
        onClick={createRoom}
        disabled={buttonDisabled}
      />
    </div>
  );
};

export default CreateRoom;
