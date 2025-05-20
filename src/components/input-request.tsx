"use client"

import { PropsWithChildren } from 'react';
import { useState, useEffect } from 'react'
import { IconContext } from "react-icons";
import { CgSpinner } from "react-icons/cg";
import { FaClipboardList } from "react-icons/fa";
import axios from 'axios';

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
    if ((user_input == null) || (user_input == '')) {
      return;
    }

    enableLoadingIcon(true);

    let openai_input = openai_template;
    openai_input = openai_input.concat(user_input);

    // Establish Rest API request with MAMP local server (localhost).
    axios.get('http://localhost:80//api.php', {
      params: {
        input: openai_input
      }
    })
    .then(function (response) {
      if (response.data) {
        if (response.data.result) {
          const output = response.data.result as string;
          setOutputAreaText(output);
        } else {
          setOutputAreaText(request_error);
        }
      }
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else if (error.message) {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }

      if (error.config) {
        console.log(error.config);
      }

      setOutputAreaText(request_error);
    })
    .finally(function () {
      // always executed
      enableLoadingIcon(false);
    });
  }

  function setOutputAreaText(text: string) {
    const outputElement = document.getElementById("request_output") as HTMLTextAreaElement;
    outputElement.value = text;
  }

  function enableLoadingIcon(enable: boolean) {
    const sendButtonElement = document.getElementById("request_button") as HTMLButtonElement;
    const enLanguageButtonElement = document.getElementById("button_language_en") as HTMLButtonElement;
    const fiLanguageButtonElement = document.getElementById("button_language_fi") as HTMLButtonElement;
    const inputElement = document.getElementById("request_input") as HTMLInputElement;
    const outputElement = document.getElementById("request_output") as HTMLTextAreaElement;
    const loadingElement = document.getElementById("loading_icon");

    if (sendButtonElement) {
      if (enable) {
        sendButtonElement.classList.replace("opacity-100", "opacity-35");
        sendButtonElement.classList.add("button_disabled");
      } else {
        sendButtonElement.classList.replace("opacity-35", "opacity-100");
        sendButtonElement.classList.remove("button_disabled");
      }
    }

    if (enLanguageButtonElement) {
      if (enable) {
        enLanguageButtonElement.classList.add("button_disabled");
      } else {
        enLanguageButtonElement.classList.remove("button_disabled");
      }
    }

    if (fiLanguageButtonElement) {
      if (enable) {
        fiLanguageButtonElement.classList.add("button_disabled");
      } else {
        fiLanguageButtonElement.classList.remove("button_disabled");
      }
    }

    if (outputElement) {
      if (enable) {
        outputElement.classList.add("pl-9");
        outputElement.classList.add("lg:pl-10");
        outputElement.value = request_wait;
      } else {
        outputElement.classList.remove("pl-9");
        outputElement.classList.remove("lg:pl-10");
      }
    }

    if (inputElement) {
      if (enable) {
        inputElement.disabled = true;
      } else {
        inputElement.disabled = false;
      }
    }

    if (loadingElement) {
      if (enable) {
        loadingElement.hidden = false;
      } else {
        loadingElement.hidden = true;
      }
    }
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