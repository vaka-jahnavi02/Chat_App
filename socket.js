const users = [];

const onSocket = (io) => {
  io.on("connection", (socket) => {
    socket.on("user:join", (name) => {
      if (!users.some((user) => user.name === name)) {
        users.push({ name, socketId: socket.id }); 
      }
      io.emit("global:message", `${name} is joined!`);
    });

    socket.on("message:send", (payload) => {
      socket.broadcast.emit("message:receive", payload);
    });

    socket.on("disconnect", () => {
      const user = users.find((user) => user.socketId === socket.id); 
      if (user) {
        io.emit("global:message", `${user.name} just left`);
      }
    });
  });
};

export default onSocket;




