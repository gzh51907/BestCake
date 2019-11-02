import axios from 'axios';
let bsk = axios.create({
    baseURL:'http://localhost:20124'
});

export default {bsk};