import { fetchAllData } from './fetchAllData.js';
import { fetchDailyData } from './fetchDailyData.js';
import {modifyDB} from './modifyDB.js';

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        let response;

        if (url.pathname === "/") {

            response = new Response(JSON.stringify({ message: "Welcome to the API" }), {
                headers: { "content-type": "application/json" },
            });

        } else if (url.pathname === "/allDataPoints") {

            const all_data = await fetchAllData(env);

            response = new Response(JSON.stringify(all_data), {
                headers: { 
                    'content-type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
            });

        } else if (url.pathname === "/dailyDataPoints") {

            const daily_data = await fetchDailyData(env);

            response = new Response(JSON.stringify(daily_data), {
                headers: { 
                    'content-type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
            });

        } else if (url.pathname === "/modifyDB") {
            // Call the imported function & get the returned values
            const results = await modifyDB(env);

            // Return the results as a JSON response
            response = new Response(JSON.stringify(results), {
                headers: { "content-type": "application/json" },
            });
            
        } else {

            response = new Response(JSON.stringify({ message: "Endpoint not found" }), { 
                status: 404,
                headers: { "content-type": "application/json" }
            });
            
        }

        return response;
    },
};