import { CHANGES, STAGES } from '../../../data/brief';
import { toggle, type FlaggedProps } from '../../../lib/brief';
import { Choices } from '../Choices';
import { TextField } from '../Field';
import { Fold } from '../Fold';
import { Question } from '../Question';

/**
 * Step 1: a new project, or something they already have. An existing one asks
 * what to do with it and where it lives now (a link is the most useful thing
 * to rebuild from).
 */
export function StartStep({ brief, set, flagged }: FlaggedProps) {
  return (
    <Question
      id="q-start"
      title="New or existing?"
      hint="Are you starting from nothing, or is there already a website or app to work on?"
      flagged={flagged.stage}
    >
      <Choices
        radio
        name="stage"
        size="md"
        options={STAGES}
        selected={[brief.stage]}
        onPick={(stage) => set({ stage })}
      />
      <Fold open={brief.stage === 'existing'}>
        <div className="flex flex-col gap-[22px]">
          <Choices
            stagger
            name="change"
            size="sm"
            label="What do you want done with it?"
            options={CHANGES}
            selected={brief.changes}
            onPick={(id) => set({ changes: toggle(brief.changes, id) })}
          />
          <TextField
            label="Link to it, if it is online"
            className="max-w-lg"
            value={brief.currentUrl}
            onChange={(currentUrl) => set({ currentUrl })}
            placeholder="yourcompany.se"
          />
        </div>
      </Fold>
    </Question>
  );
}
