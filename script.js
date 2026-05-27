const windows = document.querySelectorAll('.window');

setInterval(() => {
  windows.forEach(windowBox => {
    const random = Math.random();

    if (random > 0.5) {
      windowBox.classList.add('active');
    } else {
      windowBox.classList.remove('active');
    }
  });
}, 1500);