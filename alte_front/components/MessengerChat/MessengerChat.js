"use client";
import { useSettings } from "@/core/settings/context";
import React, { Component, Fragment } from "react";
import { FacebookProvider, CustomChat } from "react-facebook";
import { settings } from "@/core/settings/request";

const MessengerChat = () => {
  const setting = useSettings();

  return (
    <Fragment>
      {setting[settings?.messengerAppId]?.value &&
      setting[settings?.messengerPageId]?.value ? (
        <FacebookProvider
          appId={setting[settings?.messengerAppId]?.value}
          chatSupport
        >
          <CustomChat
            pageId={setting[settings?.messengerPageId]?.value}
            minimized={true} 
          />
        </FacebookProvider>
      ) : null}
    </Fragment>
  );
};

export default MessengerChat;
