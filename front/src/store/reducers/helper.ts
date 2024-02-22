const serverURL_DEV = process.env.REACT_APP_SERVER_URL_DEV;
const mockServerURL = process.env.REACT_APP_MOCK_SERVER_URL_DEV;
const serverURL_PRO = process.env.REACT_APP_SERVER_URL_PRO;

const server = (select: string) => {
    return select === "production" ? serverURL_PRO : select === "real" ? serverURL_DEV : mockServerURL
}

export { serverURL_DEV, mockServerURL, server };
