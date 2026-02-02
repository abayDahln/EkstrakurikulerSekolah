const config = {
    BASE_URL: "http://localhost:5000",
    API_URL: "http://localhost:5000/api",
    DEMO_MODE: false,
    DOWNLOAD_LINKS: {
        ANDROID: "",
        IOS: "",
        DESKTOP: "",
        WEB: "/login"
    }
};

const isDemo = typeof localStorage !== 'undefined' && localStorage.getItem("demoMode") === "true";
if (isDemo) {
    config.BASE_URL = "";
    config.API_URL = "";
    config.DEMO_MODE = true;
}

export default config;
