export const VIEWBOX_SIZE = 24;

const HAMBURGER_LINE_WIDTH = 18;
const HAMBURGER_X_INSET = (VIEWBOX_SIZE - HAMBURGER_LINE_WIDTH) / 2; // 3
const HAMBURGER_Y_INSET = HAMBURGER_X_INSET + 2;                      // 5
const CLOSE_INSET = HAMBURGER_X_INSET + 2;                            // 5

export type IconStatus = 'closed' | 'opening' | 'open' | 'closing';

export function getFirstLineProps(iconStatus: IconStatus, isBooped: boolean) {
  switch (iconStatus) {
    case 'closed': {
      // Boop: top bar moves down 2px (squeezes inward toward center)
      const y = isBooped ? HAMBURGER_Y_INSET + 2 : HAMBURGER_Y_INSET;
      return { x1: HAMBURGER_X_INSET, y1: y, x2: VIEWBOX_SIZE - HAMBURGER_X_INSET, y2: y };
    }
    case 'opening':
    case 'closing':
      return { x1: HAMBURGER_X_INSET, y1: VIEWBOX_SIZE / 2, x2: VIEWBOX_SIZE - HAMBURGER_X_INSET, y2: VIEWBOX_SIZE / 2 };
    case 'open':
      // Boop: diagonal becomes slightly flatter (endpoints shift 2px inward vertically)
      return isBooped
        ? { x1: CLOSE_INSET, y1: CLOSE_INSET + 2, x2: VIEWBOX_SIZE - CLOSE_INSET, y2: VIEWBOX_SIZE - CLOSE_INSET - 2 }
        : { x1: CLOSE_INSET, y1: CLOSE_INSET,     x2: VIEWBOX_SIZE - CLOSE_INSET, y2: VIEWBOX_SIZE - CLOSE_INSET };
  }
}

export function getSecondLineProps() {
  // Middle bar is static — never moves, just appears/disappears via opacity
  return {
    x1: HAMBURGER_X_INSET,
    y1: VIEWBOX_SIZE / 2,
    x2: VIEWBOX_SIZE - HAMBURGER_X_INSET,
    y2: VIEWBOX_SIZE / 2,
  };
}

export function getThirdLineProps(iconStatus: IconStatus, isBooped: boolean) {
  switch (iconStatus) {
    case 'closed': {
      // Boop: bottom bar moves up 2px (squeezes inward toward center)
      const y = isBooped ? VIEWBOX_SIZE - HAMBURGER_Y_INSET - 2 : VIEWBOX_SIZE - HAMBURGER_Y_INSET;
      return { x1: HAMBURGER_X_INSET, y1: y, x2: VIEWBOX_SIZE - HAMBURGER_X_INSET, y2: y };
    }
    case 'opening':
    case 'closing':
      return { x1: HAMBURGER_X_INSET, y1: VIEWBOX_SIZE / 2, x2: VIEWBOX_SIZE - HAMBURGER_X_INSET, y2: VIEWBOX_SIZE / 2 };
    case 'open':
      return isBooped
        ? { x1: CLOSE_INSET, y1: VIEWBOX_SIZE - CLOSE_INSET - 2, x2: VIEWBOX_SIZE - CLOSE_INSET, y2: CLOSE_INSET + 2 }
        : { x1: CLOSE_INSET, y1: VIEWBOX_SIZE - CLOSE_INSET,     x2: VIEWBOX_SIZE - CLOSE_INSET, y2: CLOSE_INSET };
  }
}
