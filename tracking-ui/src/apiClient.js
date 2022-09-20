import axios from 'axios';

const apiClient = axios.create({
	headers: {
		contentType: 'application/json',
	},
	timeout: 30 * 1000 * 60,
	validateStatus: (status) => {
		return status < 300;
	},
});

const baseUrl = "http://localhost:5000/hug-functions/us-central1/app";

export const getCases = async (options) => {
	const res = await apiClient({
		method: 'GET',
		url: `${baseUrl}/case`,
	});
	return res.data;
};

export const createCase = async (newCase, options) => {
	const res = await apiClient({
		method: 'POST',
		data: newCase,
		url: `${baseUrl}/case`,
	});
	return res.data;
};

export const getClients = async (options) => {
	const res = await apiClient({
		method: 'GET',
		url: `${baseUrl}/client`,
	});
	return res.data;
};

export const getCounsellingSessions = async (options) => {
	const res = await apiClient({
		method: 'GET',
		url: `${baseUrl}/counselling`,
	});
	return res.data;
};

export const getCourtCases = async (options) => {
	const res = await apiClient({
		method: 'GET',
		url: `${baseUrl}/court_case`,
	});
	return res.data;
};

export const getEducation = async (options) => {
	const res = await apiClient({
		method: 'GET',
		url: `${baseUrl}/staff`,
	});
	return res.data;
};

export const getStaff = async (options) => {
	const res = await apiClient({
		method: 'GET',
		url: `${baseUrl}/staff`,
	});
	return res.data;
};

export const getPerpetrators = async (options) => {
	const res = await apiClient({
		method: 'GET',
		url: `${baseUrl}/perpetrator`,
	});
	return res.data;
};

export const getProvinces = async (options) => {
	const res = await apiClient({
		method: 'GET',
		url: `${baseUrl}/enum/province`,
	});
	return res.data;
};

export const getAbuseTypes = async (options) => {
	const res = await apiClient({
		method: 'GET',
		url: `${baseUrl}/enum/abuse_type`,
	});
	return res.data;
};

export const getTipTypes = async (options) => {
	const res = await apiClient({
		method: 'GET',
		url: `${baseUrl}/enum/tip_type`,
	});
	return res.data;
};

export const getPartners = async (options) => {
	const res = await apiClient({
		method: 'GET',
		url: `${baseUrl}/enum/partner`,
	});
	return res.data;
};