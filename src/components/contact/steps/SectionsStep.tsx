import { pagesFor } from '../../../data/brief';
import { toggle, type FlaggedProps } from '../../../lib/brief';
import { Choices } from '../Choices';
import { TextField } from '../Field';
import { Question } from '../Question';

/**
 * Step 4: the pages it should have, then what visitors should do. Pages like
 * Shop, Checkout, Log in and the dashboards say what it has to be able to do.
 * The list follows step 2: a portfolio isn't offered a shop or dashboards.
 */
export function SectionsStep({ brief, set, flagged }: FlaggedProps) {
  return (
    <Question
      id="q-sections"
      title="Which pages should it have?"
      hint="Tick the pages you want in the first version. Leave out anything you are unsure about; we can add it later."
    >
      <Choices
        name="page"
        size="sm"
        options={pagesFor(brief.cat)}
        selected={brief.pages}
        onPick={(id) => set({ pages: toggle(brief.pages, id) })}
      />
      <TextField
        label="What should visitors do?"
        name="cta"
        required
        flagged={flagged.cta}
        className="max-w-lg"
        value={brief.cta}
        onChange={(cta) => set({ cta })}
        placeholder="Request a quote, book a time..."
      />
    </Question>
  );
}
