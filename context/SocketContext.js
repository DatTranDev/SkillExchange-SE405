import { useContext, useEffect, useState } from "react";
import React from "react";
import { useSession } from "./AuthContext";
import { io } from "socket.io-client";
const SocketContext = React.createContext();

export const useSocketContext = () => {
	return useContext(SocketContext);
};
export const SocketProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	return (
		<SocketContext.Provider
			value={{ socket, setSocket, onlineUsers, setOnlineUsers }}
		>
			{children}
		</SocketContext.Provider>
	);
};

export default SocketContext;
