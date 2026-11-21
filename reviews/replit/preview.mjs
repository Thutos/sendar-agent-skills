/** Sendar experimental mock-review preview. No sends, credentials or dynamic execution routes. */
import {createServer} from 'node:http';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {resolve} from 'node:path';
export function runReview() {
  const result=spawnSync(process.execPath,['review.mjs'],{cwd:fileURLToPath(new URL('.',import.meta.url)),env:{},encoding:'utf8',timeout:30000});
  if(result.status!==0 || result.error) throw new Error('Mock review failed; preview not started. Run npm run review for diagnostics.');
  const report=JSON.parse(result.stdout);
  if(report.result!=='pass') throw new Error('Mock review did not pass.');
  return report;
}
const escapeHTML=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function createReviewServer(report) {
  const json=JSON.stringify(report,null,2)+'\n';
  const html=`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Sendar mock review</title><style>body{font:17px system-ui;max-width:900px;margin:3rem auto;padding:0 1rem}pre{white-space:pre-wrap;overflow-wrap:anywhere;background:#f1f3f5;padding:1rem}a{color:#0645ad}</style><h1>Sendar mock review ${escapeHTML(report.version)}</h1><p>Prepared by Sendar. Experimental; no Replit affiliation or approval.</p><p>Mock checks passed. This page alone does not prove Replit execution, Agent skill discovery, submission, approval or listing. No email was sent.</p><p>Retain dated project Preview/Console evidence and the project URL separately. Do not deploy or attach credentials.</p><p><a href="/review-result.json" download>Download exact review report</a></p><pre>${escapeHTML(json)}</pre></html>`;
  return createServer((req,res)=>{
    res.setHeader('Cache-Control','no-store');
    res.setHeader('X-Content-Type-Options','nosniff');
    res.setHeader('Content-Security-Policy',"default-src 'none'; style-src 'unsafe-inline'; frame-ancestors 'self' https://replit.com https://*.replit.com");
    if(!['GET','HEAD'].includes(req.method)){res.writeHead(405,{'Allow':'GET, HEAD'});res.end();return;}
    const isJSON=req.url==='/review-result.json';
    if(req.url!=='/'&&!isJSON){res.writeHead(404);res.end();return;}
    res.setHeader('Content-Type',isJSON?'application/json; charset=utf-8':'text/html; charset=utf-8');
    if(isJSON)res.setHeader('Content-Disposition','attachment; filename="review-result.json"');
    res.writeHead(200);res.end(req.method==='HEAD'?undefined:(isJSON?json:html));
  });
}
if(process.argv[1] && resolve(process.argv[1])===fileURLToPath(import.meta.url)) {
  try {
    const server=createReviewServer(runReview());
    server.on('error',()=>{console.error('Preview listener failed.');process.exitCode=1;});
    server.listen(3000,'0.0.0.0',()=>console.log('Sendar mock-only review Preview ready on port 3000. Retain independent host evidence; no approval claimed.'));
  } catch(e){console.error(e.message);process.exitCode=1;}
}
