# 🧪 LearnHub — Manual Testing Walkthrough

This document guides you through step-by-step instructions to test all 6 core workflows of the **LearnHub** application.

---

## 🗺️ System Roles & Login Credentials
To test different perspectives, use these login credentials:
* **Learner/Creator Account**: Log in with any email (e.g. `learner@test.com` or `arjun.mehta@learnhub.com`). Defaults to `LEARNER` mode; toggle to `CREATOR` mode from settings.
* **System Administrator**: Log in using **`admin@learnhub.com`** (automatically unlocks executive stats and logs).

---

## 🚦 Workflow 1: Guest Visitor & Onboarding
*Goal: Verify unauthenticated landing and credentials verification.*

1. **Step 1.1**: Open your browser to **[http://localhost:5174/](http://localhost:5174/)**. You will see the unauthenticated landing page featuring dynamic product pitches.
2. **Step 1.2**: Click **Sign In** or **Get Started** in the hero section. Verify you are redirected to the Login page.
3. **Step 1.3**: On the Login page, click **Create an Account** at the bottom. Verify you slide to the Register page.
4. **Step 1.4**: Enter a test name, email, password, and click **Sign Up**. Verify you are logged in and routed to the Marketplace catalog dashboard.

---

## 🚦 Workflow 2: Marketplace Catalog & Resource Purchase
*Goal: Browse study guides, calculate base price + GST, and trigger simulated Razorpay checkout.*

1. **Step 2.1**: In the **Marketplace** catalog, type in the search bar (e.g., *"Spring Boot"*) or click the category pills (*"DSA"*, *"Java"*). Verify items filter instantly.
2. **Step 2.2**: Click on a paid resource card (e.g., *Complete Java Spring Boot Monolith*). Verify the preview details modal slides open showing details and the **Buy & Unlock** button.
3. **Step 2.3**: Click **Buy & Unlock**. Verify you navigate to the secure fullscreen **CheckoutPage** detailing:
   * Billing registration details.
   * Order summary (calculating base price + **18% GST tax** = Total Amount).
4. **Step 2.4**: Click **Pay via Razorpay**. Verify the **Razorpay Secure Sandbox** overlay pop-up launcher mounts.
5. **Step 2.5**: Click **Success**. Verify you are routed to the success results card showing a checked animation, transaction ID, and timestamp.
6. **Step 2.6**: Click **Go to My Library & Read Now**. Verify you are redirected to your account tab, and the purchased guide now appears in your unlocked Library.
7. **Step 2.7**: Click back to the **Marketplace** catalog, select the same resource. Verify the preview modal now renders a green **Unlocked in Library** badge, preventing duplicate billing.

---

## 🚦 Workflow 3: Immersive Reader & Q&A Discussion
*Goal: Toggle PDF page pagination vs Markdown scroll views and post technical doubts.*

1. **Step 3.1**: Navigate to **My Account ➔ My Library**.
2. **Step 3.2**: Locate a resource and click **Open Content**:
   * **If PDF Type** (e.g., *Data Structures & Algorithms Cheat Sheets*): Verify page-by-page simulator layouts load. Test clicking **Next Page**, **Previous Page**, and zoom controls (`+` / `-`).
   * **If MD/Article Type** (e.g., *React 19 & Next.js Modern Web Architecture*): Verify a continuous scrollable reading sheet loads with an "Article Reader Mode" footer.
3. **Step 3.3**: In the top-right reader header, click the **Doubts & Q&A** button. Verify the discussion drawer slides open from the right.
4. **Step 3.4**: Review existing questions. Click **Reply** under a question, enter text, and submit. Verify it appends as a nested reply.
5. **Step 3.5**: Click **Upvote** under a thread. Verify the counter increments.
6. **Step 3.6**: Type a new doubt in the top text box and click **Post Question**. Verify it pushes to the top of the discussion forum list.
7. **Step 3.7**: Click the **Library** arrow (top-left) to cleanly exit the reader and return to your account.

---

## 🚦 Workflow 4: Live Mentorship doubt session booking & Jitsi Call
*Goal: Schedule doubt slot, complete checkout, and launch embedded Jitsi Video Conference.*

1. **Step 4.1**: In the **Marketplace**, open any resource and click the publisher's name (e.g., *Rohan Verma*) to view their public Creator Profile.
2. **Step 4.2**: On the profile page, select the **Book Live 1:1 Doubt Session** tab.
3. **Step 4.3**: Fill out the form:
   * Enter a doubt topic (e.g., *"Need help debugging transaction boundaries"*).
   * Pick a preferred date and time slot.
   * Choose a session duration from the dropdown. Verify the payable fee adjusts dynamically.
4. **Step 4.4**: Click **Confirm Slot & Proceed to Pay**. Verify you route to the secure Checkout card for your slot registration.
5. **Step 4.5**: Click **Pay via Razorpay** and select **Success** on the sandbox widget.
6. **Step 4.6**: On the receipt screen, click **Go to My Library** and navigate to the **Doubt Sessions** tab.
7. **Step 4.7**: Locate your booked topic. Its status will show **APPROVED** and **PAID**. Click **Join Jitsi Meet Call**.
8. **Step 4.8**: Verify the live calling interface mounts in fullscreen, embedding Jitsi audio, camera, screen-share, and exit actions. Click **Disconnect & Exit** to close the session.

---

## 🚦 Workflow 5: Creator Studio & Dynamic Catalog Publishing
*Goal: Creator uploads resource, deletes drafts, and syncing catalog state in real-time.*

1. **Step 5.1**: Log in as a Learner. Toggle your role to **Creator Mode** from the dropdown menu in the top-right navigation header (or settings).
2. **Step 5.2**: Click **Publish Content** in the sidebar.
3. **Step 5.3**: Fill out the publishing form: Title, Category (*"Web Dev"*), Description, set Pricing (*Paid: ₹499*), and attach a mock PDF file. Click **Publish Now**.
4. **Step 5.4**: You will be redirected to the **Management Grid**. Verify your new guide is listed, and total published counters update.
5. **Step 5.5**: Switch your role back to **Learner Mode**. Navigate to the **Marketplace**.
6. **Step 5.6**: Search for your uploaded title or filter by your chosen category. **Verify your newly created guide appears in the buyer catalog in real-time!**
7. **Step 5.7**: Switch back to **Creator Mode ➔ Management Grid**. Click the red **Trash** icon next to your uploaded guide and confirm deletion.
8. **Step 5.8**: Switch back to **Learner Mode ➔ Marketplace**. Verify the deleted guide has been successfully removed from the catalog lists.

---

## 🚦 Workflow 6: Executive System Administration Dashboard
*Goal: Platform analytics audit, user freezing, and moderation logs.*

1. **Step 6.1**: Log out of your active account.
2. **Step 6.2**: On the Login screen, enter **`admin@learnhub.com`** and sign in.
3. **Step 6.3**: Verify you route to the **Admin Panel** view. Check:
   * platform analytics Cards (Total Users, Health Index).
   * Visual growth graphs showing transactions.
   * Service health status monitor showing Spring Boot, Database, and Jitsi connection links.
4. **Step 6.4**: Click the **Users** tab. Search for users. Click **Freeze** on a user. Verify status updates to **FROZEN** (red badge).
5. **Step 6.5**: Click the **Resources** tab. Verify you can click **Approve** or **Flag** on pending creator uploads.
6. **Step 6.6**: Click the **Transactions** tab. Verify the billing audit trail logs transaction statuses.
7. **Step 6.7**: Click **My Account** in the sidebar. Verify the Admin Overview mounts (role badges, platform oversight cards) and LearnerMode toggles are hidden.
