const saveToken = (token) => {
    localStorage.setItem("token", token);
};

 const getToken = () => {
    return localStorage.getItem("token");
};

 const removeToken = () => {
    localStorage.removeItem("token");
};

 const isAuthenticated = () => {
    return !!getToken();
};


export { saveToken, getToken, removeToken, isAuthenticated };