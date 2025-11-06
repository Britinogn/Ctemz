import api from './api';
import { DashboardData, DashboardStats, RecentActivity, GithubStats } from '../types/script';

interface DashboardResponse {
    message: string;
    data: DashboardData;
}

interface StatsResponse {
    message: string;
    stats: DashboardStats;
}

interface ActivityResponse {
    message: string;
    activity: RecentActivity[];
}

interface GithubResponse {
    message: string;
    data: GithubStats;
}

async function getDashboardData(): Promise<DashboardData> {
    const response: DashboardResponse = await api.get('/dashboard');
    return response.data;
}

async function getFullDashboardData(): Promise<DashboardData> {
    const response: DashboardResponse = await api.get('/dashboard/full');
    return response.data;
}

async function getDashboardStats(): Promise<DashboardStats> {
    const response: StatsResponse = await api.get('/dashboard/stats');
    return response.stats;
}

async function getRecentActivity(limit?: number): Promise<RecentActivity[]> {
    const url = limit ? `/dashboard/recent?limit=${limit}` : '/dashboard/recent';
    const response: ActivityResponse = await api.get(url);
    return response.activity;
}

async function getGithubStats(): Promise<GithubStats> {
    const response: GithubResponse = await api.get('/github');
    return response.data;
}

const DashboardAPI = {
    getDashboardData,
    getFullDashboardData,
    getDashboardStats,
    getRecentActivity,
    getGithubStats,
};

export default DashboardAPI;