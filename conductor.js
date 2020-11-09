const EXTENSION_PREFIX = 'Config for Meet: ';

if (
  document.readyState === 'complete' ||
  document.readyState === 'interactive'
) {
  muteInputs();
} else {
  window.addEventListener('DOMContentLoaded', () => {
    muteInputs();
  });
}

async function muteInputs() {
  try {
    const videoToggle = await waitForSelector('[aria-label^="Turn off camera"] > div:first-child');
    if (!videoToggle) {
      console.log(EXTENSION_PREFIX, 'Unable to find video toggle', videoToggle);
    }
    videoToggle.click();
  } catch(err) {
    console.log(EXTENSION_PREFIX, err);
  }

  try {
    const micToggle = await waitForSelector('[aria-label^="Turn off microphone"] > div:first-child');
    if (!micToggle) {
      console.log(EXTENSION_PREFIX, 'Unable to find mic toggle', micToggle, videoToggle);
    }
    micToggle.click();
  } catch(err) {
    console.log(EXTENSION_PREFIX, err);
  }
}

async function waitForSelector(selector) {
  const element = document.querySelector(selector);
  if (element === null) {
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
