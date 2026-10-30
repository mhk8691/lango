import { test } from 'node:test';
import assert from 'node:assert/strict';
import { registerHooks } from 'node:module';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
registerHooks({ resolve(specifier, context, next) {
  const mapped = specifier.startsWith('@/') ? pathToFileURL(resolve(root, specifier.slice(2))).href : specifier;
  try { return next(mapped, context); } catch (error) {
    if (mapped.startsWith('.') || mapped.startsWith('file:')) {
      for (const suffix of ['.ts', '/index.ts']) { try { return next(mapped + suffix, context); } catch {} }
    }
    throw error;
  }
}});
const { placementDemo } = await import('../lib/exams/placement-demo.ts');
const { gradeDemoExam, placementDemoKey } = await import('../lib/exams/demo-grading.ts');
const { isCompleteAnswer, completeAnswers, definitionError, examAttemptFormData } = await import('../components/exam/exam-utils.ts');
function attempt(answers) { return { examId:'placement', version:'1', submissionId:'retry-key', startedAt:'2026-01-01T00:00:00Z',submittedAt:'2026-01-01T00:01:00Z',answers }; }
function correctAnswers() { return placementDemo.questions.flatMap(q=> {
 const key=placementDemoKey[q.id];return key ? [{questionId:q.id,answer: typeof key==='string'?{kind:'choice',optionId:key}:{kind:'order',tokenIds:key}}]:[];
}); }
test('definition covers all six exercise types and does not expose grading keys',()=>{
 assert.equal(definitionError(placementDemo),null);assert.equal(new Set(placementDemo.questions.map(q=>q.kind)).size,6);
 const serialized=JSON.stringify(placementDemo);assert.ok(!serialized.includes('correctOptionId'));assert.ok(!serialized.includes('correctOrder'));assert.ok(!serialized.includes('explanation'));
 assert.ok(definitionError({...placementDemo,questions:[]}));assert.ok(definitionError({...placementDemo,questions:[placementDemo.questions[0],placementDemo.questions[0]]}));
});
test('objective scoring uses all objective questions, not only answered ones',()=>{
 const full=gradeDemoExam(placementDemo,attempt(correctAnswers()),placementDemoKey);assert.equal(full.score,100);assert.equal(full.correctCount,8);assert.equal(full.pendingReviewCount,0);assert.equal(full.estimatedLevel,'B1');assert.ok(full.skills.every(skill=>skill.score===100));assert.ok(!full.skills.some(skill=>skill.id==='writing'||skill.id==='speaking'));
 const partial=gradeDemoExam(placementDemo,attempt(correctAnswers().slice(0,1)),placementDemoKey);assert.equal(partial.score,13);assert.equal(partial.estimatedLevel,undefined);
 const wrong=gradeDemoExam(placementDemo,attempt([{questionId:'grammar-1',answer:{kind:'choice',optionId:'study'}}]),placementDemoKey);assert.equal(wrong.score,0);
 assert.throws(()=>gradeDemoExam(placementDemo,{...attempt([]),version:'wrong'},placementDemoKey));assert.throws(()=>gradeDemoExam(placementDemo,attempt([...correctAnswers(),correctAnswers()[0]]),placementDemoKey));
});
test('writing and speech require real valid responses and remain ungraded',()=>{
 const writing=placementDemo.questions.find(q=>q.kind==='writing');const speaking=placementDemo.questions.find(q=>q.kind==='speaking');
 assert.equal(isCompleteAnswer(writing,{kind:'writing',text:'too short'}),false);assert.equal(isCompleteAnswer(writing,{kind:'writing',text:'word '.repeat(101)}),false);
 const text={kind:'writing',text:'I study English every day and enjoy learning new words.'};const audio={kind:'speaking',blob:new Blob(['audio'],{type:'audio/webm'}),duration:3,mimeType:'audio/webm'};
 assert.equal(isCompleteAnswer(speaking,{...audio,blob:new Blob([])}),false);assert.equal(isCompleteAnswer(speaking,{...audio,duration:Infinity}),false);assert.equal(isCompleteAnswer(speaking,{...audio,duration:200}),false);
 const result=gradeDemoExam(placementDemo,attempt([{questionId:writing.id,answer:text},{questionId:speaking.id,answer:audio}]),placementDemoKey);assert.equal(result.pendingReviewCount,2);assert.equal(result.score,null);assert.equal(result.estimatedLevel,undefined);
});
test('partial/unknown/duplicate responses are excluded; repeated identical words may swap IDs',()=>{
 const order=placementDemo.questions.find(q=>q.id==='order-2');const expected=placementDemoKey[order.id];
 assert.equal(isCompleteAnswer(order,{kind:'order',tokenIds:[expected[0],expected[0]]}),false);
 const swapped=expected.map(id=>id==='i-first'?'i-second':id==='i-second'?'i-first':id);
 const result=gradeDemoExam(placementDemo,attempt([{questionId:order.id,answer:{kind:'order',tokenIds:swapped}}]),placementDemoKey);assert.equal(result.correctCount,1);
 assert.deepEqual(completeAnswers(placementDemo,{'grammar-1':{kind:'choice',optionId:'unknown'},'writing-1':{kind:'writing',text:'short'},'unknown':{kind:'writing',text:'ignored'}}),[]);
});
test('multipart API contract contains real audio bytes and serializable metadata',async()=>{
 const blob=new Blob(['actual audio bytes'],{type:'audio/webm'});const form=examAttemptFormData(attempt([{questionId:'speaking-1',answer:{kind:'speaking',blob,duration:2,mimeType:'audio/webm'}}]));
 const data=JSON.parse(form.get('attempt'));assert.equal(data.submissionId,'retry-key');assert.equal(data.answers[0].answer.recordingField,'recording-0');assert.equal(data.answers[0].answer.blob,undefined);assert.equal(await form.get('recording-0').text(),'actual audio bytes');
});

test('all skill definitions reuse the public model and do not assign a global level',async()=>{
 const {examDefinitions}=await import('../lib/exams/catalog.ts');
 assert.equal(examDefinitions.length,7);
 for(const definition of examDefinitions){
  assert.equal(definitionError(definition),null);
  const ids=new Set(definition.questions.map(q=>q.id));
  const response={...attempt(correctAnswers().filter(a=>ids.has(a.questionId))),examId:definition.id};
  const result=gradeDemoExam(definition,response,placementDemoKey);
  if(definition.id!=='placement') assert.equal(result.estimatedLevel,undefined);
 }
});
