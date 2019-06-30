if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/worker.js')
    .then((swRegistration) => {
      let serviceWorker;

      if (swRegistration.installing) {
        serviceWorker = swRegistration.installing;
      } else if (swRegistration.waiting) {
        serviceWorker = swRegistration.waiting;
      } else if (swRegistration.active) {
        serviceWorker = swRegistration.active;
      }

      if (serviceWorker) {
        serviceWorker.addEventListener('statechange', (e) => {
        });
      }

      swRegistration.addEventListener('updatefound', (e) => {
        swRegistration.installing.addEventListener('statechange', (e) => {});
      });

      setInterval(() => {
        swRegistration.update();
      }, 20000);
    })
    .catch((error) => {});

  navigator.serviceWorker.addEventListener('controllerchange', (e) => {});
}
