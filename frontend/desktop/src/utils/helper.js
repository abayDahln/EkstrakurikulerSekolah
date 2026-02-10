export const getToken = () => {
    return localStorage.getItem('token')
}

export const removeToken = () => {
    localStorage.removeItem('token')
}

export const getDemoMode = () => {
    return localStorage.getItem('demoMode') === 'true'
}

export const setDemoMode = (isDemo) => {
    localStorage.setItem('demoMode', isDemo)
}