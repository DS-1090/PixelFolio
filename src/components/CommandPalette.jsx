import { useEffect, useMemo, useState } from "react";

export default function CommandPalette({
  open,
  onClose,
  actions,
  themes,
  onSelectAction,
  onSelectTheme,
}) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

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

  useEffect(() => {
    if (!open) return;
    setActiveIndex(0);
  }, [open, query]);

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
          onKeyDown={(e) => {
            if (!filteredActions.length) return;

            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActiveIndex((prev) => (prev + 1) % filteredActions.length);
              return;
            }

            if (e.key === "ArrowUp") {
              e.preventDefault();
              setActiveIndex(
                (prev) =>
                  (prev - 1 + filteredActions.length) % filteredActions.length,
              );
              return;
            }

            if (e.key === "Enter") {
              e.preventDefault();
              const selected = filteredActions[activeIndex];
              if (!selected) return;
              onSelectAction(selected.id);
              onClose();
            }
          }}
        />
        <div className="palette-list">
          {filteredActions.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={`palette-item ${activeIndex === index ? "active" : ""}`}
              onClick={() => {
                onSelectAction(item.id);
                onClose();
              }}
              onMouseEnter={() => setActiveIndex(index)}
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
