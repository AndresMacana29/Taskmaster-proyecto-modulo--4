const BASE_URL_API = "http://localhost:3000/api/" //local
// const BASE_URL_API = "https://tasku.onrender.com/api/" //deployment
const apiRoutes = {
    login:`${BASE_URL_API}user/login`,
    profile:`${BASE_URL_API}user/profile/`,
    register: `${BASE_URL_API}user/register`,
    changePassword: `${BASE_URL_API}user/change-password`,
    updateProfile: `${BASE_URL_API}user/update-profile`,
    forgotPassword: `${BASE_URL_API}user/forgot-password`,
    // resetPassword: `${BASE_URL_API}user/reset-password/:token`,
    resetPassword: `${BASE_URL_API}user/reset-password`,
    addTask: `${BASE_URL_API}task/create-task`,
};

export default apiRoutes;