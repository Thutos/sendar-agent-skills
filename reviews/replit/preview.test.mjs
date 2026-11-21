import {test} from 'node:test';
import assert from 'node:assert/strict';
import {request} from 'node:http';
import {createReviewServer,runReview} from './preview.mjs';
function get(server,path,method='GET') {return new Promise((resolve,reject)=>{const req=request({host:'127.0.0.1',port:server.address().port,path,method},res=>{let body='';res.setEncoding('utf8');res.on('data',c=>body+=c);res.on('end',()=>resolve({status:res.statusCode,headers:res.headers,body}));});req.on('error',reject);req.end();});}
test('actual mock review is downloadable; no dynamic execution or file serving',async()=>{
  process.env.SENDAR_API_KEY='POISON_PREVIEW_SECRET';
  const report=runReview();assert.equal(report.version,'0.1.7');assert.equal(report.result,'pass');
  const server=createReviewServer(report);await new Promise(r=>server.listen(0,'127.0.0.1',r));
  try {
    const page=await get(server,'/');assert.equal(page.status,200);assert.match(page.body,/does not prove Replit execution/);assert.ok(!page.body.includes('POISON_PREVIEW_SECRET'));
    const download=await get(server,'/review-result.json');assert.equal(download.status,200);assert.deepEqual(JSON.parse(download.body),report);assert.equal(download.headers['cache-control'],'no-store');
    assert.equal((await get(server,'/review-result.json','HEAD')).body,'');
    for(const path of ['/package.json','/../.env','/review-result.json?run=1','/send'])assert.equal((await get(server,path)).status,404);
    assert.equal((await get(server,'/','POST')).status,405);
  } finally {await new Promise(r=>server.close(r));delete process.env.SENDAR_API_KEY;}
});
test('report text is HTML escaped',async()=>{
  const server=createReviewServer({version:'<script>bad()</script>'});await new Promise(r=>server.listen(0,'127.0.0.1',r));
  try {const page=await get(server,'/');assert.ok(!page.body.includes('<script>'));assert.match(page.body,/&lt;script&gt;/);}finally {await new Promise(r=>server.close(r));}
});
