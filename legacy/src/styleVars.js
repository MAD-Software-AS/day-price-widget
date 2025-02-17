export const computeStyleVars = (externalVars) => ({
  primaryColor: externalVars?.primaryColor || "#d5b154",
  background: {
    default: externalVars?.background?.default || "#201906",
    4: externalVars?.background?.["4"] || "rgba(255, 255, 255, 0.04)",
    10: externalVars?.background?.["10"] || "rgba(255, 255, 255, 0.1)",
    15: externalVars?.background?.["15"] || "rgba(213, 177, 84, 0.15)",
    50: externalVars?.background?.["50"] || "rgba(0, 0, 0, 0.5)",
    80: externalVars?.background?.["80"] || "rgba(36, 28, 8, 0.8)",
  },
  textColor: {
    default: externalVars?.textColor?.default || "white",
    placeholder: externalVars?.textColor?.placeholder || "#776e60",
    80: externalVars?.textColor?.["80"] || "rgba(255,255,255,0.8)",
  },
  fontSize: {
    default: externalVars?.fontSize?.default || "15",
    24: "24"
  },
  lineHeight: {
    default: externalVars?.lineHeight?.default || "20",
    32: "32"
  },
  borderRadius: {
    default: externalVars?.borderRadius?.default || "12",
    sm: externalVars?.borderRadius?.sm || "4",
  },
});
