document.onreadystatechange = function () {
  if (document.readyState === 'interactive') renderApp();

  function renderApp() {
    var onInit = app.initialized();

    onInit.then(getClient).catch(handleErr);

    function getClient(_client) {
      window.client = _client;
      client.events.on('app.activated', onAppActivate);
    }
  }
};

function handleErr(err) {
  console.log("Something went wrong !", err);
}

function onAppActivate() {
  init();
}

function init() {
  let joinBtn = document.querySelector('#join-room');
  let roomInput = document.querySelector('#roomId');
  joinBtn.addEventListener('click', function () {
    if (!roomInput.value || !roomInput.value.startsWith('https://excalidraw.com/')) {
      showNotification("danger", "Danger", "Please Enter valid roomId");
      return;
    };
    displayCollabrationModel(roomInput.value);
  })
}

function showNotification(type, title, message) {
  client.interface.trigger("showNotify", {
    type, title, message
  }).then(function (data) {
    console.log("notify success", data);
  }).catch(function (error) {
    console.error("notify error", error);
  });
}

function displayCollabrationModel(input) {
  client.interface.trigger('showModal', {
    title: 'Excalidraw Collabration Board',
    data: input,
    template: 'interface/view.html'
  })
    .then(
      function (data) {
        console.log('Success', data);
      },
      function (error) {
        console.error('Failed', error);
      }
    );
}

