import React, { FC } from "react";
import { irooms } from "../../store/reducers/roomsSlice";
import Input from "../Input/input";
import Button from "../Button/button";

interface messageScreenProps {
  rooms: irooms[];
  selectedRoom: string;
  addMessage(): void;
  message: string;
  handleChange(e: React.ChangeEvent<HTMLInputElement>): void;
}

const MessageScreen: FC<messageScreenProps> = ({
  rooms,
  selectedRoom,
  addMessage,
  message,
  handleChange,
}) => {
  return (
    <div role={"message-screen"}>
      {rooms.map((value) => {
        if (value.title === selectedRoom && value && value.messages) {
          return value.messages.map((msg, index) => {
            return (
              <div key={index}>
                <p role={"message-screen-user"}>{msg.firstName}:</p>
                <p>{msg.text}</p>
              </div>
            );
          });
        }
      })}
      <Input
        className='messageRoom'
        name='message'
        placeholder='message'
        value={message}
        onChange={handleChange}
      />
      <Button
        label='Add Message'
        role='button-addMessage'
        type='button'
        className='addMessage'
        onClick={addMessage}
      />
    </div>
  );
};

export default MessageScreen;
