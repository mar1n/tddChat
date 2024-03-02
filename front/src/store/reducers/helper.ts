import { io } from "socket.io-client";
const serverURL_DEV = process.env.REACT_APP_SERVER_URL_DEV;
const mockServerURL = process.env.REACT_APP_MOCK_SERVER_URL_DEV;
const serverURL_PRO = process.env.REACT_APP_SERVER_URL_PRO;

const server = (select: string) => {
    return select === "production" ? serverURL_PRO : select === "real" ? serverURL_DEV : mockServerURL
}

const socket = io(`http://ec2-18-169-17-215.eu-west-2.compute.amazonaws.com`, { path: "/api/socket.io", transports: ['websocket', 'polling', 'flashsocket']});

export { server, socket };
