import test from 'node:test';import assert from 'node:assert/strict';import {createPlane,step,pause,kill,approve,rogue,replay} from '../engine.js';
test('three distinct roles act in the event stream',()=>{const p=step(createPlane());assert.equal(new Set(p.events.map(x=>x.agent)).size,3)});
test('token and cost usage move per agent',()=>{const p=step(createPlane());assert.ok(p.agents.every(x=>x.tokens>0&&x.cost>0))});
test('pause stops an agent from acting',()=>{let p=pause(createPlane(),'billing');p=step(p);assert.equal(p.events.filter(x=>x.agent==='billing'&&x.type==='action').length,0)});
test('kill denies pending actions',()=>{let p=createPlane();for(let i=0;i<5;i++)p=step(p);assert.ok(p.queue.length);p=kill(p,'dispatch');assert.ok(p.queue.every(q=>q.status==='denied'))});
test('approval requires running agent',()=>{let p=createPlane();for(let i=0;i<5;i++)p=step(p);p=approve(p,p.queue[0].id,true);assert.equal(p.queue[0].status,'approved')});
test('rogue scope attempt is contained and paused',()=>{const p=rogue(createPlane());assert.equal(p.agents.find(x=>x.id==='support').status,'paused');assert.equal(p.events[0].type,'containment')});
test('replay remains agent scoped',()=>{let p=step(createPlane());assert.ok(replay(p,'billing').every(x=>x.agent==='billing'))});
