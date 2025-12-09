
const https = require('https');

const uuid = 'fc13dc0f-536a-4809-8495-1c80c95a94c8';
const projectRef = 'qhgbsjwsmjkkazhgdicr';

function check(name, url, headers) {
    return new Promise(resolve => {
        console.log(`Checking ${name}...`);
        const req = https.get(url, { headers }, res => {
            console.log(`  Status: ${res.statusCode}`);
            res.resume();
            res.on('end', resolve);
        });
        req.on('error', e => {
            console.log(`  Error: ${e.message}`);
            resolve();
        });
        req.end();
    });
}

async function run() {
    // 1. Management API
    await check('Management API (Platform)', 'https://api.supabase.com/v1/projects', {
        'Authorization': `Bearer ${uuid}`,
        'User-Agent': 'Test/1.0'
    });

    // 2. MCP Server (PAT only)
    await check('MCP Server (PAT Only)', `https://mcp.supabase.com/mcp?project_ref=${projectRef}`, {
        'Authorization': `Bearer ${uuid}`,
        'Accept': 'text/event-stream'
    });
}
run();
