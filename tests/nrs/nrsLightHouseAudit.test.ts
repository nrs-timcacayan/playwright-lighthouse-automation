import { test } from '../../src/fixtures/nrs.fixture';
import {
  navigateToEventsActivePage,
  navigateToEventsArchivedPage,
  navigateToEventsExpiredPage,
  navigateToEventsPricedDealDocumentsPage,
  navigateToLibraryPage,
} from '../../src/nrs/pages/events.page';
import { runLighthouseAuditAndSaveReports } from '../../src/utils/lighthouse.utils';

test('Audit NRS - Events/Active page', { tag: ['@end_user'] }, async ({ page }) => {
  // No need to log in - we're using the authenticated state from login.setup.ts
  // Navigate directly to Events/Active page
  await navigateToEventsActivePage(page);
  await runLighthouseAuditAndSaveReports(page, 'MyNRS-Active');
});

test('Audit NRS - Priced Deals Document page', async ({ page }) => {
  await navigateToEventsPricedDealDocumentsPage(page);
  await runLighthouseAuditAndSaveReports(page, 'MyNRS-PricedDealsDocument');
});

test('Audit NRS - Expired page', { tag: ['@end_user'] }, async ({ page }) => {
  await navigateToEventsExpiredPage(page);
  await runLighthouseAuditAndSaveReports(page, 'MyNRS-Expired');
});

test('Audit NRS - Archived page', { tag: ['@end_user'] }, async ({ page }) => {
  await navigateToEventsArchivedPage(page);
  await runLighthouseAuditAndSaveReports(page, 'MyNRS-Archived');
});

test('Audit NRS - Library page', { tag: ['@end_user'] }, async ({ page }) => {
  await navigateToLibraryPage(page);
  await runLighthouseAuditAndSaveReports(page, 'MyNRS-Library');
});
