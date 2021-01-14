import axios from 'axios';
import {CLIENT_USER, SUPER_USER} from "../constants";

export const login = (email, password) => {
    return new Promise((resolve, reject) => {
        axios
        .get('user.json').then(response => {
            const users = response.data;
            const user = users.find(
                user => user.email === email && user.password === password
            );
            if(user) {
                localStorage.setItem("token", "xcvbnm");
                delete user.password;
                localStorage.setItem("user", JSON.stringify(user));
                resolve(user)
            } else {
                reject("error");
            }
        });
    });
}

export const getLendings = (rol = CLIENT_USER) => {
    const user = JSON.parse(localStorage.getItem("user"));

    return new Promise((resolve, reject) => {
        axios
        .get('lendings.json').then(response => {
            let lendings = response.data;
            if(rol === CLIENT_USER) {
                lendings = response.data.filter(
                    lending => lending.borrower.email ===  user.email
                );
                resolve(lendings);
            } else {
                resolve(lendings);
            }
        });
    });
}

export const getLendingsByUser = user => {
    return new Promise((resolve, reject) => {
        axios
        .get('lendings.json').then(response => {
            const lendings = response.data.filter(
                lending => lending.borrower.email ===  user.email
            );
            resolve(lendings);
        });
    });
}

export const getMetrics = () => {
    return new Promise((resolve, reject) => {
        axios
        .get('lendings.json').then(response => {
            let capital = 0;
            let monthEarnings = 0;
            response.data.forEach(lending => {
                capital += lending.capital;
                monthEarnings += (lending.capital * lending.interestPercentage) / 100;
            });
            resolve({
                capital,
                monthEarnings
            });
        });
    });
}

export const getLendingById = lendingId => {
    const user = JSON.parse(localStorage.getItem("user"));

    return new Promise((resolve, reject) => {
        axios
        .get('/lendings.json').then(response => {
            const lending = response.data.find(
                lending => {
                    if(lending.id === lendingId) {
                        if(user.rol === SUPER_USER || lending.borrower.email ===  user.email) {
                            return lending;
                        }
                    }
                     
            });
            resolve(lending);
        });
    });
}

export const getUsers = () => {
    return new Promise((resolve, reject) => {
        axios
        .get('user.json').then(response => {
            resolve(response.data);
        });
    });
}

export const getFullName = (name, lastName) => {
    return name.concat(" ").concat(lastName);
}

export const isAuthenticated = () => {
    return localStorage.getItem("token") !== null;
}

export const isSuperuser = () => {
    return JSON.parse(localStorage.getItem("user")).rol === SUPER_USER;
}