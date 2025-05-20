"use client"

import { PropsWithChildren } from 'react';
import { useState, useEffect } from 'react'
import { IconContext } from "react-icons";
import { CgSpinner } from "react-icons/cg";
import { FaClipboardList } from "react-icons/fa";

type DictionaryProps = {
  page_title : string;
  openai_template : string;
  request_wait : string;
  request_error : string;
  input_placeholder : string;
  button_send : string;
  clipboard_notification : string;
};

export default function InputRequest({ page_title, openai_template, request_wait, request_error,
  input_placeholder, button_send, clipboard_notification }: PropsWithChildren<DictionaryProps>) {
  const [mounted, setMounted] = useState(false)
  const [user_input, setUserInput] = useState('')

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  function sendRequest() {
    if (user_input == null || user_input == '') {
      return;
    }

    const sendButtonElement = document.getElementById("request_button") as HTMLButtonElement;
    const enButtonElement = document.getElementById("button_language_en") as HTMLButtonElement;
    const fiButtonElement = document.getElementById("button_language_fi") as HTMLButtonElement;
    const inputElement = document.getElementById("request_input") as HTMLInputElement;
    const outputElement = document.getElementById("request_output") as HTMLTextAreaElement;
    const loadingElement = document.getElementById("loading_icon");

    if (loadingElement == null || sendButtonElement == null || enButtonElement == null || 
        fiButtonElement == null || inputElement == null || outputElement == null) {
      return;
    }

    sendButtonElement.classList.replace("opacity-100", "opacity-35");
    sendButtonElement.classList.add("button_disabled");
    enButtonElement.classList.add("button_disabled");
    fiButtonElement.classList.add("button_disabled");
    outputElement.classList.add("pl-9");
    outputElement.classList.add("lg:pl-10");
    outputElement.value = request_wait;
    inputElement.disabled = true;
    loadingElement.hidden = false;

    const xmlhttp = new XMLHttpRequest();

    // Establish POST request with MAMP local server (localhost).
    xmlhttp.open("POST", "http://localhost:80//openai_request.php");

    // Send the proper header information along with the request
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xmlhttp.onreadystatechange = function() {
      // Call a function when the state changes.
      if (this.readyState === XMLHttpRequest.DONE) {
        sendButtonElement.classList.replace("opacity-35", "opacity-100");
        sendButtonElement.classList.remove("button_disabled");
        enButtonElement.classList.remove("button_disabled");
        fiButtonElement.classList.remove("button_disabled");
        outputElement.classList.remove("pl-9");
        outputElement.classList.remove("lg:pl-10");
        inputElement.disabled = false;
        loadingElement.hidden = true;

        if (this.status === 200) {
          if (this.responseText === "ERROR") {
            outputElement.value = request_error;
          } else {
            outputElement.value = this.responseText;
          }
        } else {
          outputElement.value = request_error;
        }
      }
    }

    let openai_input = openai_template;
    openai_input = openai_input.concat(user_input);
    let request_body = "request=";
    request_body = request_body.concat(openai_input);

    xmlhttp.send(request_body);
  }

  async function handleCopy() {
    try {
      const outputElement = document.getElementById("request_output") as HTMLTextAreaElement;

      if (outputElement == null) {
        return;
      }

      // Copy text to clipboard
      await navigator.clipboard.writeText(outputElement.value); 

      //Show notification
      showClipboardNotification(true);
      // Hide notification after 2.5 seconds
      setTimeout(() => showClipboardNotification(false), 2500);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  }

  function showClipboardNotification(enable : boolean) {
    const desktopNotificationElement = document.getElementById("clipboard_notification_desktop");
    const mobileNotificationElement = document.getElementById("clipboard_notification_mobile");

    if (desktopNotificationElement != null) {
      if (enable) {
        desktopNotificationElement.innerText = clipboard_notification;
      } else {
        desktopNotificationElement.innerText = "";
      }
    }

    if (mobileNotificationElement != null) {
      if (enable) {
        mobileNotificationElement.innerText = clipboard_notification;
      } else {
        mobileNotificationElement.innerText = "";
      }
    }
  }

  return (
    <>
    <p className="font-black text-center text-2xl lg:text-4xl w-11/12 lg:w-2/4 lg:mb-8">
      {page_title}
    </p>
    <div className="absolute inline lg:hidden top_selector top-2 left-2 lg:top-4 lg:left-4">
      <button
        id="clipboard_button_mobile"
        className="button_visual p-2"
        onClick={handleCopy}>
        <div className="inline">
          <IconContext.Provider value={{ className: "icon_size_theme" }}>
          <FaClipboardList />
          </IconContext.Provider>
        </div>
      </button>
      <div
        id="clipboard_notification_mobile"
        className="clipboard_notification pl-2">
      </div>
    </div>
    <div className="relative flex flex-row items-center justify-center mainarea_width">
      <div
        id="clipboard_notification_desktop"
        className="absolute hidden lg:inline top-[-2.25rem] left-0 clipboard_notification">
      </div>
      <input
        id="request_input"
        className="textbox_visual button_height input_box_width input_box_margin"
        value={user_input}
        placeholder={input_placeholder}
        onChange={event => setUserInput(event.target.value)}
        disabled={false} />
      <button
        id="request_button"
        className="button_visual button_height input_button_width opacity-100"
        onClick={sendRequest}
        hidden={false} >
        {button_send}
      </button>
    </div>
    <div className="relative mainarea_width flex-grow">
      <div
        id="loading_icon"
        className="absolute pl-2 pt-2 lg:pl-2 lg:pt-3"
        hidden={true}>
        <IconContext.Provider value={{ className: "icon_size_loading" }}>
          <CgSpinner className="animate-spin" />
        </IconContext.Provider>
      </div>
      <div
        className="absolute hidden lg:inline ml-[-1.0rem] mt-2 lg:ml-[-3.25rem] lg:mt-3"
        hidden={false}>
        <button
          id="clipboard_button_desktop"
          className="flex flex-row items-center justify-center button_visual p-2"
          onClick={handleCopy}>
          <div className="inline">
            <IconContext.Provider value={{ className: "icon_size_clipboard" }}>
            <FaClipboardList />
            </IconContext.Provider>
          </div>
        </button>
      </div>
      <textarea readOnly
        id="request_output"
        className="textbox_visual w-full h-full"
        value=""
        placeholder=""
        disabled={true} />
    </div>
    </>
  )
}