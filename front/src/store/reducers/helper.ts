const serverURL = `http://localhost:5666`;
const mockServerURL = `http://localhost:5000`;

const server = (select: string) => {
    return select === "real" ? serverURL : mockServerURL
}

export { serverURL, mockServerURL, server };
