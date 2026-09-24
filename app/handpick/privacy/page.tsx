import type { Metadata } from "next";

import { LegalPage } from "../LegalPage";

export const metadata: Metadata = {
  title: "Handpick Privacy Policy",
  description: "How Handpick accesses and protects your photo library data.",
  alternates: {
    canonical: "https://benjaminnnnnn.github.io/portfolio/handpick/privacy/",
  },
};

export default function HandpickPrivacyPage() {
  return (
    <LegalPage
      eyebrow="Effective September 24, 2026"
      title="Privacy Policy"
      intro="Handpick is built to organize your photo library privately. Your photos and analysis stay on your device, and Handpick does not operate a server that collects them."
    >
      <section>
        <h2>Photo library access</h2>
        <p>
          With your permission, Handpick accesses photos, videos, and related library
          information such as dates, dimensions, media types, favorites, and albums. This
          access lets the app display your library, organize reviews, identify duplicates or
          large files, update favorites, manage albums, and delete items you select.
        </p>
        <p>
          You control photo access in <strong>Settings → Apps → Handpick → Photos</strong> on
          your device.
        </p>
      </section>

      <section>
        <h2>On-device processing</h2>
        <p>
          Handpick processes your photo library on your device. The developer does not
          receive your photos, videos, photo metadata, analysis results, or review choices.
          Handpick does not use third-party advertising, analytics, or tracking services and
          does not sell personal data.
        </p>
        <p>
          If an item is stored in iCloud rather than locally, Apple&apos;s Photos framework may
          download it according to your iCloud Photos settings. That exchange is handled by
          Apple, not by a Handpick server.
        </p>
      </section>

      <section>
        <h2>Information stored on your device</h2>
        <p>
          Handpick stores app preferences, onboarding and review progress, local photo
          analysis, album cover choices, calendar backgrounds, and limited widget data in
          the app&apos;s local storage or shared app-group container. This information supports
          app and widget features and is not transmitted to the developer.
        </p>
        <p>
          Local app data remains until you remove it, reset the relevant feature, or delete
          the app. Changes made to your Photos library—such as favorites, albums, or
          deletions—remain in that library unless you change them there. Deleted photos are
          managed through Apple Photos, including its Recently Deleted album.
        </p>
      </section>

      <section>
        <h2>Purchases and sharing</h2>
        <p>
          Apple processes in-app purchases through StoreKit. Handpick can read product and
          entitlement status needed to unlock features, but the developer does not receive
          your payment-card details.
        </p>
        <p>
          When you choose to share media, Handpick presents Apple&apos;s system share sheet. The
          destination you select receives the items you choose and applies its own privacy
          practices.
        </p>
      </section>

      <section>
        <h2>Policy changes</h2>
        <p>
          This policy may be updated when Handpick&apos;s features or privacy practices change.
          The effective date at the top of this page will identify the latest version.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          Questions about this policy can be sent to{" "}
          <a href="mailto:benjaminzhuangjobs@outlook.com?subject=Handpick%20Privacy">
            benjaminzhuangjobs@outlook.com
          </a>
          .
        </p>
      </section>
    </LegalPage>
  );
}
