export const VALID_CATEGORIES = [
    "red",
    "white",
    "rose",
    "sparkling",
    "special",
  ];
  
  export function getCategoryFromWineId(wineId) {
    if (!wineId || typeof wineId !== "string") return null;
  
    const prefix = wineId.split("_")[0];
    return VALID_CATEGORIES.includes(prefix) ? prefix : null;
  }
  
  export function getWineOptionsByGroup(questionSets) {
    return {
      red: questionSets.red?.[0]?.options || [],
      white: questionSets.white?.[0]?.options || [],
      "sparkling-group": [
        ...(questionSets.rose?.[0]?.options || []),
        ...(questionSets.sparkling?.[0]?.options || []),
        ...(questionSets.special?.[0]?.options || []),
      ],
    };
  }