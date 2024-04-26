const cleanStyle = (styler, value) => {
  if (!styler || !styler.type || !styler.type.pattern || typeof value === 'undefined') {
    return '';
  }
  if (styler.isArray) {
    if (!Array.isArray(value)) {
      return '';
    }
    value = value.map((v) => v.toString().toLowerCase()).filter((v) => v.match(styler.type.pattern));
    value = [...new Set(value)];
  } else {
    value = value.toString();
    if (!value.match(styler.type.pattern)) {
      return '';
    }
  }
  if (styler.type.process) {
    value = styler.type.process(value);
  }
  return value;
};

const cleanStyles = (styleProps = {}, styleProcessors = {}) =>
  Object.keys(styleProcessors)
    .map((styleProp) => [styleProp, cleanStyle(styleProcessors[styleProp], styleProps[styleProp])])
    .reduce((reducer, mapped) => {
      const [styleProp, styleValue] = mapped;
      if (styleValue.length || styleValue === true || styleValue === false) {
        return { ...reducer, [styleProp]: styleValue };
      }
      return reducer;
    }, {});
