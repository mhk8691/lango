import { test } from 'node:test';
import assert from 'node:assert/strict';
import { dashboardHref, activeDashboardItem, dashboardItems } from '../components/dashboard/routes.ts';

test('dashboard links preserve details, query and hash without changing external or auth links',()=>{
 assert.equal(dashboardHref('/course/1?from=favorites#curriculum'),'/dashboard/courses/1?from=favorites#curriculum');
 assert.equal(dashboardHref('/exam/placement?level=A2'),'/dashboard/exam/placement?level=A2');
 assert.equal(dashboardHref('/complete-profile'),'/dashboard/profile/edit');
 assert.equal(dashboardHref('/home'),'/dashboard');
 for(const value of ['/dashboard/courses/1','/login','https://example.com/course/1','/courses-other','#section']) assert.equal(dashboardHref(value),value);
});
test('active sections handle drills and only one sidebar entry per section',()=>{
 for(const item of dashboardItems) assert.equal(activeDashboardItem(item.href),item.id);
 assert.equal(activeDashboardItem('/dashboard/courses/1'),'courses');
 assert.equal(activeDashboardItem('/dashboard/lesson'),'courses');
 assert.equal(activeDashboardItem('/dashboard/exam/placement'),'tests');
 assert.equal(activeDashboardItem('/dashboard/exam/speaking'),'tests');
 assert.equal(activeDashboardItem('/dashboard/exam/vocabulary'),'tests');
 assert.equal(activeDashboardItem('/dashboard/profile/edit'),'settings');
 assert.equal(activeDashboardItem('/dashboard/exercises/listening'),'exercises');
 assert.equal(new Set(dashboardItems.map(item=>item.href)).size,dashboardItems.length);
});
