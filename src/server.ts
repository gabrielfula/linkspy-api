import app from "./app";

const PORT = process.env.PORT || 4001;

export const server = app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`)
});

export default app;