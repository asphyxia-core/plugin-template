$('#plugin-click').on('click', () => {
  emit('click').then(() => {
    location.reload();
  });
});

$('#plugin-random').on('click', () => {
  emit('random').then(result => {
    $('#random-number').text(result.data.number);
  });
});
