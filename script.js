const countDownDate = new Date("09.11.2020 8:30:00").getTime();

const x = setInterval(function () {
  const now = new Date().getTime();
  // Find the distance between now and the count down date
  const distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  const countdown = document.querySelector("#countdown");

  countdown.innerHTML = `${days} jours ${hours}h:${minutes}m:${seconds}s`;

  if (distance < 0) {
    clearInterval(x);
    countdown.innerHTML = "EXPIRED";
  }
}, 1000);
