import api from './api';

export const createBudget = async (budgetData) => {
    const response = await api.post('/finance/budget', budgetData);
    return response.data;
};

export const approveBudget = async (id) => {
    const response = await api.put(`/finance/budget/${id}/approve`);
    return response.data;
};

export const requestExpense = async (expenseData) => {
    const response = await api.post('/finance/expense', expenseData);
    return response.data;
};

export const approveExpense = async (id) => {
    const response = await api.put(`/finance/expense/${id}/approve`);
    return response.data;
};

export const getEventReport = async (eventId) => {
    const response = await api.get(`/finance/report/${eventId}`);
    return response.data;
};
