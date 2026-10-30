import {test} from 'node:test';
import assert from 'node:assert/strict';
import {parseVocabulary, normalizeWord, lessonWordId, wordInputError} from '../lib/vocabulary.ts';

test('stable lesson IDs normalize whitespace/case but retain lesson provenance',()=>{
 const first={word:' Turn  RIGHT ',meaning:'به راست بپیچ',lesson:{id:'places',title:'شهر'}};
 assert.equal(lessonWordId(first),lessonWordId({...first,word:'turn right'}));
 assert.notEqual(lessonWordId(first),lessonWordId({...first,lesson:{id:'other',title:'دیگر'}}));
 assert.equal(normalizeWord('  BANK  '),'bank');
});
test('input requires actual word/meaning and enforces storage limits',()=>{
 assert.ok(wordInputError({word:'   ',meaning:'معنی'}));assert.ok(wordInputError({word:'bank',meaning:' '}));assert.ok(wordInputError({word:'x'.repeat(81),meaning:'معنی'}));assert.ok(wordInputError({word:'bank',meaning:'معنی',example:'x'.repeat(301)}));assert.equal(wordInputError({word:'café',meaning:'کافه',example:'At the café.'}),null);
});
test('stored content is validated so malformed data cannot break word cards',()=>{
 const custom={id:'custom:1',kind:'custom',word:'book',meaning:'کتاب'};
 const saved={id:'saved:1',kind:'saved',word:'bank',meaning:'بانک',lesson:{id:'places',title:'شهر'}};
 assert.deepEqual(parseVocabulary(JSON.stringify([custom,saved,custom,{...custom,id:'bad',lesson:{title:{nested:'bad'}}},{...saved,id:'no-source',lesson:null},{...custom,id:'bad-example',example:{}},null])),[custom,saved]);
 for(const raw of ['{broken','{}','null','42']) assert.deepEqual(parseVocabulary(raw),[]);
});
