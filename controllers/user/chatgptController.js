const { response } = require('../../config/response');

const generateCompletion = async (req, res) => {
    const {
        prompt
    } = req.query;

    try {
        const fetch = (await import('node-fetch')).default;
        const apiKey = process.env.CHATGPT_APIKEY;
        const apiUrl = 'https://api.openai.com/v1/completions';

        const requestBody = {
            prompt: prompt,
            max_tokens: 50,
            temperature: 0.7,
            n: 1,
            model: "gpt-3.5-turbo"
        };

        const chatgptResponse = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify(requestBody)
        });

        const data = await chatgptResponse.json();

        return response(res, data, 'Data Fetched Successfully', 200);
    } catch (error) {
        return response(res, req.query, error?.message, 500);
    }
}
module.exports = {
    generateCompletion
};
