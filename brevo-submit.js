async function submitToBrevo(e) {
  e.preventDefault();
  const form = e.target;
  const email = form.querySelector('input[type="email"]').value;
  const btn = form.querySelector('button[type="submit"], input[type="submit"]');

  btn.disabled = true;
  btn.textContent = 'Invio in corso...';

  try {
    const res = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': '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'
      },
      body: JSON.stringify({
        email: email,
        listIds: [3],
        updateEnabled: true
      })
    });

    if (res.status === 201 || res.status === 204) {
      form.style.display = 'none';
      const success = document.getElementById('success-message')
                      || document.querySelector('.success, .thank-you, [data-success]');
      if (success) {
        success.style.display = 'block';
      } else {
        form.insertAdjacentHTML('afterend',
          '<p style="color:#A0391E;font-style:italic;margin-top:16px;">✦ Sei nella lista. A presto!</p>');
      }
    } else {
      btn.disabled = false;
      btn.textContent = 'Voglio provarlo';
      alert('Si è verificato un errore, riprova.');
    }
  } catch(err) {
    btn.disabled = false;
    btn.textContent = 'Voglio provarlo';
    alert('Si è verificato un errore, riprova.');
  }
}

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('form').forEach(function(form) {
    if (form.action && form.action.includes('formspree')) {
      form.addEventListener('submit', submitToBrevo);
    }
  });
});
