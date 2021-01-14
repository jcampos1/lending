import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import ContractPage from '../pages/ContractPage';
import LendingsPage from '../pages/LendingsPage';
import LoginPage from '../pages/LoginPage';
import PerformancePage from '../pages/PerformancePage';
import { isAuthenticated, isSuperuser } from '../utils';

const AppRouter = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact>
                    <LoginPage />
                </Route>
                {
                    isAuthenticated() && (
                        <>
                            <Route path="/lendings" exact>
                                <LendingsPage />
                            </Route>
                            <Route path="/lendings/:lendingId" exact>
                                <ContractPage />
                            </Route>
                            {
                                isSuperuser() && (
                                    <Route path="/performance" exact>
                                        <PerformancePage />
                                    </Route>
                                )
                            }
                        </>
                    )
                }
                
            </Switch>
        </Router>
    );
}

export default AppRouter;