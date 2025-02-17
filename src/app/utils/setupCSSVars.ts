const setupCSSVars = (shadowRoot: ShadowRoot, varsConfig: any) => {
    console.log('varsConfig:', varsConfig)
    const shadowElement = shadowRoot.host as HTMLElement
    varsConfig?.primary && shadowElement.style.setProperty('--primary', varsConfig?.primary)
    varsConfig?.danger && shadowElement.style.setProperty('--danger', varsConfig?.danger)

    /* Backgrounds */
    varsConfig?.bgDefault && shadowElement.style.setProperty('--bg-default', varsConfig?.bgDefault)
    varsConfig?.bg4 && shadowElement.style.setProperty('--bg-4', varsConfig?.bg4)
    varsConfig?.bg10 && shadowElement.style.setProperty('--bg-10', varsConfig?.bg10)
    varsConfig?.bg15 && shadowElement.style.setProperty('--bg-15', varsConfig?.bg15)
    varsConfig?.bg50 && shadowElement.style.setProperty('--bg-50', varsConfig?.bg50)
    varsConfig?.bg80 && shadowElement.style.setProperty('--bg-80', varsConfig?.bg80)

    /* Text colors */
    varsConfig?.textColorDefault && shadowElement.style.setProperty('--text-color-default', varsConfig?.textColorDefault)
    varsConfig?.textColorPlaceholder && shadowElement.style.setProperty('--text-color-placeholder', varsConfig?.textColorPlaceholder)
    varsConfig?.textColor80 && shadowElement.style.setProperty('--text-color-80', varsConfig?.textColor80)

    varsConfig?.fontSizeDefault && shadowElement.style.setProperty('--font-size-default', varsConfig?.fontSizeDefault)
    varsConfig?.fontSize24 && shadowElement.style.setProperty('--font-size-24', varsConfig?.fontSize24)

    varsConfig?.lineHeightDefault && shadowElement.style.setProperty('--line-height-default', varsConfig?.lineHeightDefault)
    varsConfig?.lineHeight32 && shadowElement.style.setProperty('--line-height-32', varsConfig?.lineHeight32)

    varsConfig?.borderRadiusDefault && shadowElement.style.setProperty('--border-radius-default', varsConfig?.borderRadiusDefault)
    varsConfig?.borderRadiusSm && shadowElement.style.setProperty('--border-radius-sm', varsConfig?.borderRadiusSm)
}

export default setupCSSVars