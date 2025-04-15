import { test } from '../../src/fixtures/nrs.fixture';
import { navigateToRFNInvestorViewPage } from '../../src/rfn/pages/researchFN.page';
import { runLighthouseAuditAndSaveReports } from '../../src/utils/lighthouse.utils';

test('Audit RFN - Investor view', async ({ page }) => {
  await navigateToRFNInvestorViewPage(page);
  await runLighthouseAuditAndSaveReports(page, 'RFN-Investor');
});
