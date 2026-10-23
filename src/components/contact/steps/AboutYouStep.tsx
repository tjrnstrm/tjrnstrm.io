import type { FlaggedProps } from '../../../lib/brief';
import { Chip } from '../Chip';
import { TextField } from '../Field';
import { Question } from '../Question';

/**
 * Step 3: who is asking. Name, email, company and what they do are mandatory;
 * "No name yet" stands in for a company name that doesn't exist yet.
 */
export function AboutYouStep({ brief, set, flagged }: FlaggedProps) {
  return (
    <Question
      id="q-who"
      title="About you"
      hint="So I know who I am building for, and where to reply. Fields marked * are required."
    >
      <div className="grid gap-x-5 gap-y-[18px] sm:grid-cols-2">
        <TextField
          label="Your name"
          name="name"
          required
          flagged={flagged.name}
          autoComplete="name"
          value={brief.name}
          onChange={(name) => set({ name })}
        />
        <TextField
          label="Email"
          type="email"
          name="email"
          required
          flagged={flagged.email}
          autoComplete="email"
          value={brief.email}
          onChange={(email) => set({ email })}
          placeholder="you@company.se"
        />
        <div className="flex items-end gap-3 sm:col-span-2">
          <TextField
            label="Company or business name"
            name="company"
            required
            flagged={flagged.company}
            className="min-w-0 flex-1"
            autoComplete="organization"
            disabled={brief.noName}
            value={brief.company}
            onChange={(company) => set({ company })}
            placeholder="Your company AB"
          />
          <Chip
            type="checkbox"
            name="noName"
            size="sm"
            label="No name yet"
            checked={brief.noName}
            onChange={() => set({ noName: !brief.noName })}
          />
        </div>
        <TextField
          label="What you do"
          name="industry"
          required
          flagged={flagged.industry}
          value={brief.industry}
          onChange={(industry) => set({ industry })}
          placeholder="Excavation contractor, hair salon..."
        />
        <TextField
          label="Location"
          value={brief.location}
          onChange={(location) => set({ location })}
          placeholder="Stockholm"
        />
        <TextField
          label="Who are your customers?"
          className="sm:col-span-2"
          value={brief.audience}
          onChange={(audience) => set({ audience })}
          placeholder="Construction firms, homeowners"
        />
        <TextField
          label="Phone (optional)"
          type="tel"
          autoComplete="tel"
          value={brief.phone}
          onChange={(phone) => set({ phone })}
        />
      </div>
    </Question>
  );
}
