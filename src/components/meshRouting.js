export function getSectionFromMeshName(meshName) {
  const name = (meshName || "").toLowerCase();

  if (
    name.includes("screen") ||
    name.includes("monitor") ||
    name.includes("display")
  ) {
    return "resume";
  }

  if (name.includes("keyboard") || name.includes("keyboardchord")) {
    return "blogs";
  }

  if (
    name.includes("disk") ||
    name.includes("floppy") ||
    name.includes("drive") ||
    name.includes("hard") ||
    name.includes("hdd") ||
    name.includes("ssd") ||
    name.includes("storage") ||
    name.includes("light") ||
    name.includes("lamp") ||
    name.includes("bulb") ||
    name.includes("led") ||
    name.includes("brightness")
  ) {
    return "projects";
  }

  if (
    name.includes("painting") ||
    name.includes("paintingframe") ||
    name.includes("paintingcanvas") ||
    name.includes("wallart")
  ) {
    return "hobbies";
  }

  if (
    name.includes("cpu") ||
    name.includes("chip") ||
    name.includes("mouse") ||
    name.includes("board") ||
    name.includes("option") ||
    name.includes("start") ||
    name.includes("tab")
  ) {
    return "coding";
  }

  if (name.includes("computer") || name.includes("body")) {
    return "about";
  }

  return null;
}
