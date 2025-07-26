const toggleBtn = document.getElementById('toggleBtn');
  const sidebar = document.querySelector('.sidebar');

  toggleBtn.addEventListener('click', function () {
    sidebar.classList.toggle('open');
  });