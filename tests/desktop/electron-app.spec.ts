import { test } from '../../src/core/test.fixture';
import { AllureHelper } from '../../src/utils/allure-helper';

test.describe('Desktop Application Automation Suite', () => {
  test.beforeEach(() => {
    AllureHelper.setMetadata({
      epic: 'Desktop Native Suite',
      feature: 'Desktop Client Workspace Sync',
      owner: 'Desktop QA Team',
    });
  });

  test('TC-DSK-001: Desktop application launches and verifies window title', async ({
    desktopSession,
  }) => {
    AllureHelper.setMetadata({
      story: 'Desktop Window Initialization',
      severity: 'blocker',
      tags: ['desktop', 'electron', 'smoke'],
    });

    const { desktopPage } = desktopSession;
    await desktopPage.verifyDesktopAppLoaded();
  });

  test('TC-DSK-002: User connects desktop workspace with license key', async ({
    desktopSession,
  }) => {
    AllureHelper.setMetadata({
      story: 'Desktop Workspace Connection',
      severity: 'critical',
      tags: ['desktop', 'electron', 'integration'],
    });

    const { desktopPage } = desktopSession;
    await desktopPage.verifyDesktopAppLoaded();
    await desktopPage.connectWorkspace('LIC-ALPHA-98214', 'Enterprise-Core');
    await desktopPage.verifyConnectedStatus('Connected successfully to Enterprise-Core as LIC-ALPHA-98214');
  });
});
