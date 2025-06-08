function isMobile() {
  return window.innerWidth < 768;
}

export function responsiveLayout(items) {
  return isMobile() ? { rows: items } : { cols: items };
}

export function getTabHeader(iconClass, label) {
  if (isMobile()) {
    return `<span class='webix_icon ${iconClass}'></span>`;
  } else {
    return `<span class='webix_icon ${iconClass}'></span> ${label}`;
  }
}

export function privacyResponsiveLayout(items) {
  if (window.innerWidth < 1050){
    return { rows: items };
  }
  else if (window.innerWidth < 768) {
    return { rows: items };
  }
  else {
    return { cols: items };
  }
}