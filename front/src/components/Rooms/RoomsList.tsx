import React, { FC } from "react";
import {irooms} from "../../store/reducers/roomsSlice";

interface roomsListProps {
    rooms: irooms[];
    selectRoom(title: string): void;
    selectedRoom: string;
}

const RoomsList: FC<roomsListProps> = ({ rooms, selectRoom, selectedRoom}) => {
    return <div role="rooms-list">
        {
            rooms.length === 0
            ? "No Rooms"
            : rooms.map((value, index) => {
                return (
                    <div
                        role={"listitem"}
                        key={index}
                        onClick={() => selectRoom(value.title)}
                        className={value.title === selectedRoom ? "selected" : ""}
                    >
                        {value.title}
                    </div>
                )
            })
        }
    </div>
}

export default RoomsList;