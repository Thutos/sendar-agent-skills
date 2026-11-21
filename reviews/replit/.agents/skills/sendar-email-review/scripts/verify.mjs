import assert from 'node:assert/strict';
import {message,deliver} from './recipes.mjs';
let calls=0;
const forbidden=async()=>{calls++;throw Error('Network must not run in mock mode');};
for(const kind of ['welcome','booking','password-reset','invoice','migration']){
 const result=await deliver(message(kind),{fetcher:forbidden});
 assert.equal(result.sent,false);assert.equal(result.mock,true);
 assert.equal(result.request.url,'https://sendar.app/api/emails');
}
assert.equal(calls,0);
await assert.rejects(deliver(message('welcome'),{live:true,fetcher:forbidden}),/private key/);
assert.equal(calls,0);
let request;
await deliver(message('welcome'),{live:true,key:'MOCK_NOT_A_CREDENTIAL',eventId:'replit-review-event-0001',fetcher:async(url,options)=>{request={url,options};return {ok:true,json:async()=>({id:1})};}});
assert.equal(request.options.headers['Idempotency-Key'],'replit-review-event-0001');
assert.equal(request.options.headers.Authorization,'Bearer MOCK_NOT_A_CREDENTIAL');
let failedCalls=0;
await assert.rejects(deliver(message('welcome'),{live:true,key:'MOCK_NOT_A_CREDENTIAL',eventId:'replit-review-event-0002',fetcher:async()=>{failedCalls++;return {ok:false,status:429,json:async()=>({error:'mock rate limit'})};}}),/429/);
assert.equal(failedCalls,1);
console.log('PASS: five mock recipes; zero mock network calls; missing credentials rejected; idempotency header preserved; no implicit retry. Transport fully mocked; no email sent.');

// Ambiguous transport outcomes must never trigger a second request or leak raw errors.
for(const mode of ['timeout','non-json-error','non-json-success']){
 let count=0;
 const fetcher=async()=>{count++;if(mode==='timeout')throw Error('SECRET_PROVIDER_DIAGNOSTIC');return {ok:mode==='non-json-success',status:502,json:async()=>{throw Error('SECRET_PROVIDER_DIAGNOSTIC');}};};
 await assert.rejects(deliver(message('welcome'),{live:true,key:'MOCK_NOT_A_CREDENTIAL',eventId:'replit-review-event-0003',fetcher}),e=>{assert.ok(!e.message.includes('SECRET_PROVIDER_DIAGNOSTIC'));assert.match(e.message,/inspect message history/);assert.match(e.message,/same event identifier/);return true;});
 assert.equal(count,1);
}
console.log('PASS: timeout, non-JSON failure and unreadable success each make one request, retain retry guidance and do not expose raw diagnostic content.');

let ambiguousCalls=0;
for(const live of ['false','true',0,1,null,{},[]]){
 await assert.rejects(deliver(message('welcome'),{live,key:'MOCK_NOT_A_CREDENTIAL',eventId:'replit-review-event-0004',fetcher:async()=>{ambiguousCalls++;throw Error('FORBIDDEN');}}),/explicit boolean/);
}
assert.equal(ambiguousCalls,0);
console.log('PASS: seven non-boolean live flags rejected before transport; explicit true and default false remain tested.');
