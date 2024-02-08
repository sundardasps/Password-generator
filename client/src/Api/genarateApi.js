import axios from 'axios'

const url = axios.create({
    baseURL:"http://localhost:8000"
})

export async function genaratePassword(requireMents){
    try {
        console.log(requireMents,"lllllll");
        const response = await url.post('/genaratepassword',requireMents)
        return response
    } catch (error) {
        console.log(error);
    }
}