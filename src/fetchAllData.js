import { all_tickers } from './tickers.js';

export async function fetchAllData(env) {
    let all_data = {};

    for (let ticker of all_tickers) {
        let tableName = ticker.marketId.replace(/-/g, '');
        const statement = await env.DB.prepare(`SELECT * FROM ${tableName}`);
        const results = await statement.all();
        all_data[ticker.name] = results;
    }

    return all_data;
}