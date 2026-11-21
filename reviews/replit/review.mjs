/** Credential-free review runner. No external requests or environment dump. */
import {spawnSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {readFileSync,writeFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('.',import.meta.url));
const files=['package.json','.replit','recipes.mjs','verify.mjs','review.mjs','preview.mjs','preview.test.mjs','README.txt','REVIEW.md','.agents/skills/sendar-email-review/SKILL.md','.agents/skills/sendar-email-review/scripts/recipes.mjs','.agents/skills/sendar-email-review/scripts/verify.mjs'];
const sha256=Object.fromEntries(files.map(name=>[name,createHash('sha256').update(readFileSync(new URL(name,import.meta.url))).digest('hex')]));
// Deliberately do not inherit live-send flags, credentials or child preload hooks.
const result=spawnSync(process.execPath,['verify.mjs'],{cwd:root,env:{},encoding:'utf8',timeout:15000});
const report={package:'sendar-replit-review',version:JSON.parse(readFileSync(new URL('package.json',import.meta.url))).version,checked_at:new Date().toISOString(),runtime:{node:process.version,platform:process.platform,arch:process.arch},result:result.status===0&&!result.error?'pass':'fail',test_output:result.stdout||'',sha256,scope:'Mock transport only. Host identity requires independently retained Replit console output and project URL. No OAuth, live sending, partner acceptance or public listing proven.'};
writeFileSync(new URL('review-result.json',import.meta.url),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report,null,2));
process.exitCode=report.result==='pass'?0:1;
