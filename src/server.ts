import { server } from "./app";

const PORT = process.env.PORT || 4001;

server.listen(PORT, () => {
    console.log(`🚀 Server is running at ${PORT}`);
});