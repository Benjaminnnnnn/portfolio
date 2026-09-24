import type { Metadata } from "next";
import Link from "next/link";

import { LegalPage } from "../LegalPage";

export const metadata: Metadata = {
  title: "Handpick Support",
  description: "Help with photo access, cleanup, purchases, and privacy in Handpick.",
  alternates: {
    canonical: "https://benjaminnnnnn.github.io/portfolio/handpick/support/",
  },
};

export default function HandpickSupportPage() {
  return (
    <LegalPage
      eyebrow="Handpick for iPhone"
      title="Support"
      intro="Need a hand with Handpick? Start with the answers below or send an email for personal support."
    >
      <section>
        <h2>Contact support</h2>
        <p>
          Email{" "}
          <a href="mailto:benjaminzhuangjobs@outlook.com?subject=Handpick%20Support">
            benjaminzhuangjobs@outlook.com
          </a>
          . Include your iPhone model, iOS version, and a short description of what happened.
          Please do not attach private photos unless they are necessary to explain the issue.
        </p>
      </section>

      <section>
        <h2>Frequently asked questions</h2>

        <h3>How do I change photo access?</h3>
        <p>
          Open <strong>Settings → Apps → Handpick → Photos</strong> on your iPhone, then
          choose the access level you want. Handpick needs photo-library access to show and
          organize your photos.
        </p>

        <h3>What happens when I delete a photo?</h3>
        <p>
          Handpick asks you to confirm deletions before applying them to your photo library.
          Apple Photos normally moves deleted items to Recently Deleted, where iOS manages
          final removal and recovery.
        </p>

        <h3>How do I restore Handpick Plus?</h3>
        <p>
          In Handpick, open <strong>Settings → About → Restore purchases</strong>. Make sure
          the device is signed in with the Apple Account used for the original purchase.
        </p>

        <h3>Does Handpick upload my photos?</h3>
        <p>
          No. Handpick&apos;s photo organization and analysis run on your device, and the
          developer does not operate a server that receives your library. iCloud-only items
          may be downloaded by Apple&apos;s Photos framework according to your device settings.
        </p>
      </section>

      <section>
        <h2>Policies</h2>
        <p>
          Read the <Link href="/handpick/privacy/">Handpick Privacy Policy</Link> or Apple&apos;s{" "}
          <a
            href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/"
            target="_blank"
            rel="noreferrer"
          >
            Standard End User License Agreement
          </a>
          .
        </p>
      </section>
    </LegalPage>
  );
}
