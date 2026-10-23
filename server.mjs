import { createServer } from 'node:http';
import { createReadStream, existsSync, statSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';

const root=process.cwd(),port=Number(process.env.PORT||3000);
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8'};
createServer((req,res)=>{
  const pathname=new URL(req.url,'http://localhost').pathname;
  const relative=pathname==='/'?'index.html':normalize(pathname).replace(/^[/\\]+/,'');
  const file=join(root,relative);
  if(!file.startsWith(root)||!existsSync(file)||!statSync(file).isFile()){res.writeHead(404);return res.end('Not found')}
  res.writeHead(200,{'content-type':types[extname(file)]||'application/octet-stream'});
  createReadStream(file).pipe(res);
}).listen(port,()=>console.log(`Digital Ark: http://localhost:${port}`));
