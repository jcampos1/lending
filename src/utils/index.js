import axios from 'axios';
import {CAPITAL_PAYMENT_KEY, CLIENT_USER, LENDING_STATUS_PENDING, SUPER_USER} from "../constants";

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
                    lending => lending.borrower.email ===  user.email && lending.status === LENDING_STATUS_PENDING
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
                lending => lending.borrower.email ===  user.email && lending.status === LENDING_STATUS_PENDING
            );
            resolve(lendings);
        });
    });
}

export const getCurrentCapital = lending => {
    const promise1= axios.get('/payments.json');
    const promise2= axios.get('/unpaid-interests.json');
    return new Promise((resolve) => {
        Promise.all([promise1, promise2]).then(response => {
            const arrayCapitalPayments = response[0].data.filter(
                payment => payment.type ===  CAPITAL_PAYMENT_KEY && payment.lending.id === lending.id
            );
            const arrayUnpaidInterests = response[1].data.filter(
                unpaidInterest => unpaidInterest.lending.id === lending.id
            );
            const capitalPayments = arrayCapitalPayments.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0);
            const unpaidInterests = arrayUnpaidInterests.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0);
            const currentCapital = lending.capital + unpaidInterests - capitalPayments;
            resolve(currentCapital);
        })
    });
}

export const getPaymentsByLendingId = lendingId => {
    return new Promise((resolve, reject) => {
        axios
        .get('/payments.json').then(response => {
            const payments = response.data.filter(
                payment => payment.lending.id ===  parseInt(lendingId)
            );
            resolve(payments);
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