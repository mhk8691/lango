import {test} from 'node:test';
import assert from 'node:assert/strict';
import {chartGeometry, nearestPointIndex, peakIndex, progressValue, studyTime} from '../components/progress-report/chart-utils.ts';

test('chart geometry handles no data, one point, and out-of-range values',()=>{
 const empty=chartGeometry([],320,245);
 assert.equal(empty.line,'');assert.equal(empty.area,'');assert.deepEqual(empty.coordinates,[]);
 const single=chartGeometry([{label:'one',value:50}],320,245);
 assert.ok(single.coordinates[0].x>single.left&&single.coordinates[0].x<320-single.right);
 const geometry=chartGeometry([{label:'low',value:-10},{label:'high',value:140},{label:'missing',value:NaN}],390,245);
 assert.deepEqual(geometry.coordinates.map(point=>point.value),[0,100,0]);
 assert.ok(geometry.coordinates.every(point=>Number.isFinite(point.x)&&Number.isFinite(point.y)));
 assert.ok(!geometry.line.includes('NaN'));
 assert.equal(peakIndex([{label:'a',value:10},{label:'b',value:84},{label:'c',value:30}]),1);
 assert.equal(peakIndex([]),0);
 assert.equal(progressValue(Infinity),0);
});

test('pointer snapping remains inside the data and supports short series',()=>{
 assert.equal(nearestPointIndex(-10000,34,260,7),0);
 assert.equal(nearestPointIndex(10000,34,260,7),6);
 assert.equal(nearestPointIndex(164,34,260,7),3);
 assert.equal(nearestPointIndex(100,34,260,1),0);
 assert.equal(nearestPointIndex(100,34,260,0),0);
});

test('study duration uses honest minute/hour units',()=>{
 assert.deepEqual(studyTime(45),{value:45,label:'دقیقه مطالعه'});
 assert.deepEqual(studyTime(90),{value:1.5,label:'ساعت مطالعه'});
 assert.deepEqual(studyTime(1440),{value:24,label:'ساعت مطالعه'});
 assert.deepEqual(studyTime(-10),{value:0,label:'دقیقه مطالعه'});
});
