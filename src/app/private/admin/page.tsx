import type { Metadata } from 'next';
import Script from 'next/script';
import styles from './admin.module.css';

export const metadata: Metadata = {
  title: 'Harbor Smile CMS',
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function PrivateAdminPage() {
  return (
    <section aria-label="Private CMS dashboard" className={styles.adminShell}>
      <Script id="decap-manual-init" strategy="beforeInteractive">
        {`window.CMS_MANUAL_INIT = true;`}
      </Script>
      <Script
        src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"
        strategy="afterInteractive"
      />
      <Script id="decap-bootstrap" strategy="afterInteractive">
        {`
          (function initDecap(retries) {
            if (window.CMS && typeof window.CMS.init === 'function') {
              window.CMS.init({ config: '/private/admin/config.yml' });
              return;
            }

            if (retries > 0) {
              setTimeout(function retry() {
                initDecap(retries - 1);
              }, 120);
            }
          })(80);
        `}
      </Script>
      <div id="nc-root" className={styles.cmsRoot} />
      <noscript>JavaScript is required to load the CMS dashboard.</noscript>
    </section>
  );
}
