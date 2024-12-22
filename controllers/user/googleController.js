const axios = require('axios');
const { response } = require('../../config/response');

async function searchGoogle(query) {
    const apiKey = process.env.GOOGLE_API_KEY || 'AIzaSyCaUXvJdq4eX4uS4nfe1qxiUfaXofcmXZo';
    const searchEngineId = process.env.GOOGLE_SEARCH_ENGINE_ID || 'b49cf28c71ba3446f';
    const apiUrl = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${encodeURIComponent(query)}`;

    try {
        const response = await axios.get(apiUrl);
        const searchResults = response.data.items;
        return searchResults;
    } catch (error) {
        console.error('Error searching Google:', error.message);
        throw error;
    }
}

const search = async (req, res) => {
    const {
        keyword
    } = req.query;
    
    try {
        const results = await searchGoogle(keyword);
        return response(res, results, 'Data Fetched Successfully', 200);
    } catch (error) {
        return response(res, req.query, error?.message, 500);
    }
}

module.exports = {
    search
};
