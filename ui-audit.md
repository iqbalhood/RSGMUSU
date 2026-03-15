# UI Audit — RSGM USU

## 1. Overview
The current RSGM USU interface uses a dark dashboard theme with simple sidebar navigation and standard list tables. It is built using React and Tailwind CSS. While functional and already leveraging some modern utilities (Lucide Icons, Axios intercepts), it lacks aesthetic hierarchy, smooth animations, and reusable, styled components (such as a generic Table or Modal component).

## 2. Shared/Unique UI Patterns
| Pattern | Current Implementation Details |
| :--- | :--- |
| **Navigation** | AppShell Layout with a fixed Left Sidebar (collapsible) set in Dark Navy/slate-900. |
| **Active States** | Gradient/Color highlights on icons and titles on hover. Navigation item uses Blue background with shadow. |
| **Tables** | Inline styled tables within components (e.g., `AdminDokter`) using responsive standard layout and Lucide `Loader2`. |
| **Forms** | Inline standard styles (e.g., `<input type="text" className="w-full bg-slate-800...">`). No floating labels or rigid error states. |
| **Modals** | Inline conditional rendering components featuring background blur filters (`backdrop-blur-sm`). |
| **Cards** | Static boxes featuring subtle border edges (`border-slate-800`) and flex/grid orientations. |
| **Typography** | `Inter` loaded heavily for uniform typography. No headline variations. |
| **Palette** | Dark/Slate themes overall. Stronger dark nodes (`slate-950`). Accent primary uses normal Vercel styles or blues. |

---

## 3. Route & Component Trees
### Main Pages:
- **/landing**: Choice of direct login dashboards.
- **/login**: Standard email-to-credential box layout.
- **/admin**: Dashboard counters.
- **/admin/pasien**, **/admin/dokter**, **/admin/obat**, **/admin/layanan**: Full list components with popup form modalities.
- **/frontdesk**, **/frontdesk/daftar-klinik**: Main queues and patient registration layout models.
- **/klinik/antrian**: Subscribed visit queuing, diagnostics submission.
- **/cetak**: Traditional client printable canvas styles.

---

## 4. Choice of Direction

**Selection: Option A — "Clinical Precision"**

### Reasonings:
The system facilitates precise medical recording (odontogram timelines), so extreme data clarity on slightly tinted White canvases with actionable Primary Teal overlays allows doctors to track data without dashboard visual fatigue, which tends to accumulate on full black-centric grids.

### Key Refactor Metrics:
1. Shift master background to Slate/Neutral whites (`#F8FAFC`).
2. Move sidebar nodes back to highly sophisticated crisp dark anchors.
3. Modularize `DataTable`, `AppLayout`, `Modals`, and `Buttons` components as globally referenced helpers so that updates on tables immediately take effect globally.
4. Establish rigid `--space-` and `colors-` scaling metrics within Tailwind.
