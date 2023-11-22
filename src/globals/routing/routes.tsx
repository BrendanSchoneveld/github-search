import React from 'react';
import { Navigate } from 'react-router-dom'
import AppLayout from "../../layout/AppLayout";
import ErrorScreen from "../../components/pages/error/ErrorScreen";
import SearchPage from "../../components/pages/search/SearchPage";
import SearchHistoryPage from "../../components/pages/history/SearchHistoryPage";

// Define base route for App
export const baseName = '/'

export enum RoutePaths {
    SearchPath =  'search',
    SearchHistoryPath = 'history',
    ErrorBoundaryPath = '*'
}

// Index route defines where to redirect to when base route is in URL address
const indexRoute = {
    index: true,
    path: baseName,
    element: <Navigate to={'search'} />,
};

// Error Screen when no existing route is visited
const errorBoundary = {
    path: RoutePaths.ErrorBoundaryPath,
    element: <ErrorScreen />,
}

export const routes = [
    {
        element: <AppLayout />,
        children: [
            indexRoute,
            /*
            * Main page routes start from here
            * */
            {
                path: RoutePaths.SearchPath,
                element: <SearchPage />
            },
            {
                path: RoutePaths.SearchHistoryPath,
                element: <SearchHistoryPage />,
            },
            errorBoundary
        ],
    },
];
