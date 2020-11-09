const EXTENSION_PREFIX = "Config for Meet: ";
const SCRIPT_TIMEOUT = 20000;
let inTime = true;

if (
  document.readyState === "complete" ||
  document.readyState === "interactive"
) {
  muteInputs();
} else {
  window.addEventListener("DOMContentLoaded", () => {
    muteInputs();
  });
}

async function muteInputs() {
  setTimeout(() => {
    inTime = false;
  }, SCRIPT_TIMEOUT);

  try {
    const videoToggle = await waitForSelector(
      '[aria-label^="Turn off camera"] > div:first-child'
    );
    if (!videoToggle) {
      throw "Unable to find video toggle";
    }
    videoToggle.click();
  } catch (err) {
    console.log(EXTENSION_PREFIX, err);
  }

  try {
    const micToggle = await waitForSelector(
      '[aria-label^="Turn off microphone"] > div:first-child'
    );
    if (!micToggle) {
      throw "Unable to find mic toggle";
    }
    micToggle.click();
  } catch (err) {
    console.log(EXTENSION_PREFIX, err);
  }
}

async function waitForSelector(selector) {
  const element = document.querySelector(selector);
  if (inTime && element === null) {
    await rafAsync();
    return waitForSelector(selector);
  } else {
    return Promise.resolve(element);
  }
}

function rafAsync() {
  return new Promise((resolve) => {
    requestAnimationFrame(resolve);
  });
}
