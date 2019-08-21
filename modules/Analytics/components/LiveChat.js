import React from "react";

export function PushDL_LiveChat(cb) {
  if (window.$zopim && window.$zopim.livechat && window.$zopim.livechat.window) {
    window.$zopim.livechat.window.toggle();
    if (cb) { cb("live chat done"); }
  } else {
    dataLayer.push({
      event: "openLiveChat",
    });

    const tryStartChat = window.setInterval(() => {
      if (window.$zopim && window.$zopim.livechat && window.$zopim.livechat.window) {
        window.$zopim.livechat.window.toggle();
        clearInterval(tryStartChat);
        if (cb) { cb("live chat done"); }
      }
    }, 1500);
  }
}
