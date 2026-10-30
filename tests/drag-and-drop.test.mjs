import { test } from 'node:test';
import assert from 'node:assert/strict';
import { insertToken, isCorrectOrder, moveToken, normalizeOrder } from '../components/exercises/drag-and-drop/order-utils.ts';
const tokens=[{id:'i1',text:'I'},{id:'think',text:'think'},{id:'i2',text:'I'},{id:'can',text:'can'}];
const solution=['i1','think','i2','can'];

test('repeated identical words are interchangeable while token identities remain unique',()=>{
 assert.equal(isCorrectOrder(tokens,solution,solution),true);
 assert.equal(isCorrectOrder(tokens,['i2','think','i1','can'],solution),true);
 assert.equal(isCorrectOrder(tokens,['think','i1','i2','can'],solution),false);
 assert.equal(isCorrectOrder(tokens,['i1','think','i1','can'],solution),false);
 assert.equal(isCorrectOrder(tokens,['i1','think','i2'],solution),false);
 assert.equal(isCorrectOrder(tokens,['i1','think','missing','can'],solution),false);
 assert.equal(isCorrectOrder([],[],[]),false);
});

test('normalization removes stale and duplicate token IDs without changing the caller array',()=>{
 const order=['i1','unknown','i1','i2'];
 assert.deepEqual(normalizeOrder(tokens,order),['i1','i2']);
 assert.deepEqual(order,['i1','unknown','i1','i2']);
});

test('insertion and reordering handle boundaries and never duplicate a moved token',()=>{
 const order=['a','b','c'];
 assert.deepEqual(insertToken(order,'b',0),['b','a','c']);
 assert.deepEqual(insertToken(order,'a',100),['b','c','a']);
 assert.deepEqual(insertToken(order,'d',-3),['d','a','b','c']);
 assert.deepEqual(moveToken(order,'b',-1),['b','a','c']);
 assert.deepEqual(moveToken(order,'b',1),['a','c','b']);
 assert.deepEqual(moveToken(order,'a',-1),order);
 assert.deepEqual(moveToken(order,'c',1),order);
 assert.deepEqual(moveToken(order,'missing',1),order);
 assert.deepEqual(order,['a','b','c']);
});
