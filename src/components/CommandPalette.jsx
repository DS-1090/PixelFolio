import { useMemo, useState } from "react";

export default function CommandPalette({
  open,
  onClose,
  actions,
  themes,
  onSelectAction,
  onSelectTheme,
}) {
  const [query, setQuery] = useState("");

  const filteredActions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter((item) => {
      return (
        item.label.toLowerCase().includes(q) ||
        item.hint.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q)
      );
    });
  }, [actions, query]);

  if (!open) return null;

  return (
    <div className="palette-backdrop" onClick={onClose} role="presentation">
      <section
        className="palette-panel"
        onClick={(e) => e.stopPropagation()}
        aria-label="Command palette"
      >
        <input
          className="palette-input"
          autoFocus
          placeholder="Jump to section..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="palette-list">
          {filteredActions.map((item) => (
            <button
              key={item.id}
              type="button"
              className="palette-item"
              onClick={() => {
                onSelectAction(item.id);
                onClose();
              }}
            >
              <strong>{item.label}</strong>
              <span>{item.hint}</span>
            </button>
          ))}
        </div>
        <div className="palette-themes">
          {themes.map((theme) => (
            <button
              key={theme.id}
              type="button"
              className="theme-chip"
              onClick={() => {
                onSelectTheme(theme.id);
                onClose();
              }}
            >
              {theme.label}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
