import './.agents/skills/sendar-email-review/scripts/verify.mjs';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
const script=new URL('./.agents/skills/sendar-email-review/scripts/recipes.mjs',import.meta.url);
for(const kind of ['welcome','booking','password-reset','invoice','migration']){
 const code=`globalThis.fetch=async()=>{throw Error('FORBIDDEN_NETWORK')}; process.argv[1]=${JSON.stringify(fileURLToPath(script))}; process.argv[2]=${JSON.stringify(kind)}; await import(${JSON.stringify(script.href)});`;
 const result=spawnSync(process.execPath,['--input-type=module','-e',code],{encoding:'utf8',timeout:5000,env:{SENDAR_LIVE:'1',SENDAR_API_KEY:'MOCK_NOT_A_CREDENTIAL',SENDAR_FROM:'poison@example.invalid',SENDAR_TO:'poison@example.invalid',SENDAR_EVENT_ID:'poison-event-00001',SENDAR_RESET_URL:'https://example.invalid/poison',SENDAR_PAYMENT_URL:'https://example.invalid/poison'}});
 assert.equal(result.status,0,result.stderr);
 const preview=JSON.parse(result.stdout);
 assert.equal(preview.mock,true);assert.equal(preview.sent,false);
 assert.equal(preview.request.body.to[0],'recipient@example.net');
 assert.ok(!result.stdout.includes('poison'));assert.ok(!result.stdout.includes('MOCK_NOT_A_CREDENTIAL'));
}
console.log('PASS: all five CLI previews ignore inherited live flags, credentials and recipient/link overrides; forbidden fetch never invoked.');
