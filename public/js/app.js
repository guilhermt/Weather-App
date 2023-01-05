async function getData(adress) {
  try {
    const response = await fetch(`/weather?adress=${adress}`);
    const data = await response.json();
    return data;
  } catch (e) {
    return { error: 'Error: Could not fetch data' };
  }
}

const weatherForm = document.querySelector('form');
const locationInput = document.querySelector('.location-input');
const message1 = document.querySelector('.message-1');
const message2 = document.querySelector('.message-2');

weatherForm.addEventListener('submit', async (e) => {
  message1.textContent = 'Loading...';
  message2.textContent = '';
  e.preventDefault();
  const data = await getData(locationInput.value);
  if (data.error) {
    message1.textContent = data.error;
    return;
  }
  message1.textContent = data.location;
  message2.textContent = data.forecast;
});
