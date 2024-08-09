//sidebar
const menuItems = document.querySelectorAll('.menu-item');


//MESSAGES
const messagesNotification = document.querySelector('#messages-notification');
const messages = document.querySelector('.messages');
const message = messages.querySelectorAll('.message');
const messageSearch = document.querySelector('#message-search');

//remove active class
const changeActiveItem = () => {
    menuItems.forEach(item => {
        item.classList.remove('active');
    })
}

menuItems.forEach(item =>{
    item.addEventListener('click', () => {
        changeActiveItem();
        item.classList.add('active');
        if(item.id != 'notifications'){
            document.querySelector('.notifications-popup').style.display = 'none';
        }else{
            document.querySelector('.notifications-popup').style.display = 'block';
            document.querySelector('#notifications .notification-count').style.display = 'none';
        }
    })
})



//      MESSAGES        //
//searching
const searchMessage = () => {
    const val = messageSearch.value.toLowerCase();
    console.log(val);
    message.forEach(chat =>{
        let name = chat.querySelector('h5').textContent.toLowerCase();
        if(name.indexOf(val) != -1){
            chat.style.display = 'flex';
        }else{
            chat.style.display = 'none';
        }
    })
}

//search function
messageSearch.addEventListener('keyup', searchMessage);


//message notifs
messagesNotification.addEventListener('click', () => {
    messages.style.boxShadow = '0 0 1rem var(--color-primary)';
    messagesNotification.querySelector('.notification-count').style.display = 'none';
    setTimeout(() => {
        messages.style.boxShadow = 'none';
    }, 2000);
})

$(document).ready(function() {

    $('#toggleChat').click(function() {
      $('#chatContainer').toggleClass('collapsed');
    });
  

    $('#chatForm').submit(function(e) {
      e.preventDefault();
      var message = $(this).find('input').val();
      if (message.trim() !== '') {
        $('.chat-messages').append('<li class="list-group-item">' + message + '</li>');
        $(this).find('input').val('');
      }
    });
  });






document.addEventListener('DOMContentLoaded', () => {
    const friendsList = document.getElementById('friends');
    const chatHeader = document.getElementById('chatHeader');
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const sendMessageBtn = document.getElementById('sendMessageBtn');

    let currentChat = null;
    const chats = {
        friend1: [],
        friend2: [],
        friend3: []
    };

// Handle friend click
    friendsList.addEventListener('click', (e) => {
        if (e.target.tagName === 'LI') {
            currentChat = e.target.getAttribute('data-friend');
            chatHeader.textContent = e.target.textContent;
            loadChatMessages();
        }
    });


});