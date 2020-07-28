import * as axios from 'axios';

export const thoughtsAPI = {

    getThoughts(page = 1)  {
        let url = 'http://localhost:5000/thoughts'
        return axios.get(url).then(response => response.data.thoughts)
    },

    setThought(thoughtBody) {
        let url = 'http://localhost:5000/thoughts'
        return axios.post(url, thoughtBody, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    },

    updateThoughtLike(thoughtBody, thoughtId) {
        let url = `http://localhost:5000/thoughts/liked/${thoughtId}`
        return axios.put(url, thoughtBody, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }, 
    updateThoughtFavofite(thoughtBody, thoughtId) {
        let url = `http://localhost:5000/thoughts/favorite/${thoughtId}`
        return axios.put(url, thoughtBody, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }, 
    updateThoughtText(thoughtBody, thoughtId) {
        let url = `http://localhost:5000/thoughts/text/${thoughtId}`
        return axios.put(url, thoughtBody, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }, 

    deleteThought(thoughtId) {
        let url = `http://localhost:5000/thoughts/${thoughtId}`
        return axios.delete(url, {}, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }, 
}