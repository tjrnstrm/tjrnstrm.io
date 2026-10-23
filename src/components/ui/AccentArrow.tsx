/**
 * The teal → that marks an action; nudges right when its `group` parent is
 * hovered. `className` adds to it (spacing, tracking), the colour stays.
 */
export function AccentArrow({ className = '' }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`text-teal-700 transition-transform group-hover:translate-x-1 motion-reduce:transition-none dark:text-teal-500 ${className}`}
    >
      →
    </span>
  );
}
