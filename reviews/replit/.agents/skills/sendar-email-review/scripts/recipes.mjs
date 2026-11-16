/** Node.js 20+. Local mock by default. No dependencies, no automatic retries. */
import {pathToFileURL} from 'node:url';
export function message(kind,{from='Sendar demo <demo@example.com>',to='recipient@example.net',resetUrl='https://example.com/reset?token=LOCAL_DEMO',paymentUrl='https://example.com/invoices/INV-100',date='2030-01-15 10:00 UTC',reference='BOOK-100'}={}){
 for(const url of [resetUrl,paymentUrl])if(new URL(url).protocol!=='https:')throw Error('Use HTTPS application links');
 const content={welcome:['Welcome aboard','Your account is ready. Sign in to get started.'],booking:['Your booking confirmation',`Your booking is confirmed for ${date}. Reference: ${reference}.`],'password-reset':['Reset your password',`Use your application’s single-use reset link: ${resetUrl}. If you did not request this, ignore this email.`],invoice:['Your invoice is ready',`View your invoice securely: ${paymentUrl}`],migration:['Integration test','This workflow now uses Sendar. Confirm the old sender is disabled before live cutover.']}[kind];
 if(!content)throw Error('Choose welcome, booking, password-reset, invoice or migration');
 return {from,to:[to],subject:content[0],text:content[1]};
}
export async function deliver(payload,{live=false,key,eventId,fetcher=globalThis.fetch}={}){
 if(typeof live!=='boolean')throw Error('live must be an explicit boolean; no request made.');
 if(!live)return {mock:true,sent:false,request:{method:'POST',url:'https://sendar.app/api/emails',body:payload}};
 if(!key||!/^[-A-Za-z0-9_:]{16,128}$/.test(eventId||''))throw Error('Provide a private key and stable 16–128 character event identifier.');
 let response;
 try { response=await fetcher('https://sendar.app/api/emails',{method:'POST',headers:{Authorization:`Bearer ${key}`,'Content-Type':'application/json','Idempotency-Key':eventId},body:JSON.stringify(payload),signal:AbortSignal.timeout(30000)}); }
 catch { throw Error('Submission outcome unknown: inspect message history before any retry. Keep the same event identifier.'); }
 if(!response.ok)throw Error(`HTTP ${response.status}: inspect message history before any retry. Keep the same event identifier.`);
 try { return await response.json(); }
 catch { throw Error('Response unreadable; submission outcome unknown: inspect message history before any retry. Keep the same event identifier.'); }
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 // Review CLI is always synthetic, even with inherited live-send environment flags.
 // Library transport behavior is exercised only through injected fakes in verify.mjs.
 const kind=process.argv[2]||'welcome';
 console.log(JSON.stringify(await deliver(message(kind)),null,2));
}
