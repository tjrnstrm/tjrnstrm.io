import { CATEGORIES } from '../../../data/brief';
import type { FlaggedProps } from '../../../lib/brief';
import { Choices } from '../Choices';
import { TextField } from '../Field';
import { Fold } from '../Fold';
import { Question } from '../Question';

/**
 * Step 2: what kind of project (one), with a "what kind?" follow-up (also one).
 * Asked as "what is it?" when they are bringing something they already have.
 */
export function BuildStep({ brief, set, flagged }: FlaggedProps) {
  const existing = brief.stage === 'existing';
  return (
    <Question
      id="q-build"
      title={existing ? 'What is it?' : 'What are we building?'}
      hint="Pick the one that fits best. If nothing fits, pick Something else and describe it."
      flagged={flagged.cat}
    >
      <Choices
        radio
        name="cat"
        size="md"
        options={CATEGORIES}
        selected={[brief.cat]}
        onPick={(cat) => set({ cat })}
      />
      {CATEGORIES.filter((c) => c.types.length).map((c) => (
        <Fold key={c.id} open={brief.cat === c.id}>
          <Choices
            radio
            stagger
            name={`type-${c.id}`}
            size="sm"
            label={`${c.label}: what kind?`}
            options={c.types.map((t) => ({ id: `${c.id}:${t}`, label: t }))}
            selected={[brief.kind]}
            onPick={(kind) => set({ kind })}
          />
        </Fold>
      ))}
      <Fold open={brief.cat === 'other'}>
        <TextField
          label="Something else: describe it"
          value={brief.other}
          onChange={(other) => set({ other })}
          placeholder="A digital menu for a restaurant, an event page, a members club..."
        />
      </Fold>
    </Question>
  );
}
