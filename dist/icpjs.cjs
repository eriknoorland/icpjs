"use strict";const t=t=>"x"in t&&"y"in t;var e=(t,e)=>{const n=t.x-e.x,r=t.y-e.y;return Math.pow(n*n+r*r,.5)},n=(t,e)=>t.map((t=>({x:t.x+e.x,y:t.y+e.y}))),r=(t,e)=>{const{phi:n}=e,r=Math.sin(n),o=Math.cos(n);return t.map((t=>({x:o*t.x-r*t.y,y:r*t.x+o*t.y})))},o=(t,n)=>{const r=n.length;let o=1/0,y={x:1/0,y:1/0};for(let i=0;i<r;i+=1){const r=n[i],x=e(t,r);x<o&&(o=x,y=r)}return y},y=(t,e)=>({x:t.x-e.x,y:t.y-e.y}),i=({x:t,y:e})=>t*t+e*e,x=(t,{x1:e,y1:n,x2:r,y2:o})=>{const x=i(y(t,{x:r,y:o})),s=i(y({x:e,y:n},{x:r,y:o})),a=i(y(t,{x:e,y:n}));if(a+s<x)return{x:e,y:n};if(x+s<a)return{x:r,y:o};let h,l=n-o,c=r-e,f=e*o-r*n;if(0===c){if(0===l)return null;h=-l,l=-1,f/=h}else h=-c,l/=h,c=-1,f/=h;if(0!==c){let e;return e=0!==l?(t.x/l+t.y-f)/(l+1/l):t.x,{x:e,y:l*e+f}}return{x:f/-l,y:t.y}},s=(t,n)=>{const r=n.length;let o=1/0,y={x:1/0,y:1/0};for(let i=0;i<r;i+=1){const r=n[i],s=x(t,r);if(!s)continue;const a=e(t,s);a<o&&(o=a,y=s)}return y},a=Object.freeze({run:(y,i,x={x:0,y:0,phi:0},a={})=>{if(!y.length)throw new Error("At least 1 reference point or line segment is required");const h=y[0],l=t(h),c="x1"in(f=h)&&"x2"in f&&"y1"in f&&"y2"in f;var f;if(!l&&!c)throw new Error("The reference should either be an array of points or line segments");if(!i.length)throw new Error("At least 1 data point is required");if(!t(i[0]))throw new Error("The data should be an array of points");const u=Object.assign({method:c?s:o,maxIterations:20,tolerance:.1},a),p=i.length,m={x:0,y:0,phi:0};let d=[...i],w=0;for(let t=0;t<u.maxIterations;t+=1){let t=0,o=0,i=0,s=0,a=0,h=0,l=0,c=0,f=0;for(let e=0;e<p;e+=1){const n=d[e],r=u.method(n,y);if(!r)continue;t+=1;const p={x:n.x-x.x,y:n.y-x.y},m={x:r.x-x.x,y:r.y-x.y};o+=p.x,i+=m.x,s+=p.y,a+=m.y,h+=p.x*m.x,l+=p.y*m.y,c+=p.x*m.y,f+=p.y*m.x}const g=h-o*i/t,b=l-s*a/t,M=c-o*a/t,E=f-s*i/t,j=o/t,I=s/t,O=i/t,T=a/t;if(e({x:j,y:I},{x:O,y:T})<u.tolerance)break;const q={x:0,y:0,phi:0};q.phi=Math.atan2(M-E,g+b);const v=Math.cos(q.phi),z=Math.sin(q.phi);q.x=O-(j*v-I*z),q.y=T-(j*z+I*v),d=n(d,q),d=r(d,q),m.x+=q.x,m.y+=q.y,m.phi+=q.phi,w+=1}return Object.freeze({transformation:m,dataPoints:d,numIterations:w})},utils:{applyTranslation:n,applyRotation:r}});module.exports=a;