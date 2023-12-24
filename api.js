import axios from 'axios'

const api = axios.create({
    baseURL: 'https://cheshire-youth-server.onrender.com/api'
})

export const getCommissionsByUser = (user_id) => {
    return api.get(`/commission/user/${user_id}`)
    .then(res => res.data.commissions)
}

export const loginUser = (loginData) => {
    return api.post('/users/login', loginData)
    .then(res => res.data.user)
}

export const getAllCommissions = () => {
    return api.get('/commission')
    .then(res => res.data.commissions)
}

export const getReportsByCommission = (commission, params) => {
    return api.get(`/reports/${commission}`, params)
    .then(res => res.data.reports)
}

export const getTopicsByCommission = (commission) => {
    return api.get(`/topics/${commission}`)
    .then(res => res.data.topics)
}

export const postReport = (postData) => {
    return api.post('/reports', postData)
    .then(res => res.data.report)
}