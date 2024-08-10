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

    // Handle friend div click
    document.body.addEventListener('click', (e) => {
        if (e.target.closest('div[data-friend]')) {
            const clickedDiv = e.target.closest('div[data-friend]');
            currentChat = clickedDiv.getAttribute('data-friend');
            chatHeader.textContent = clickedDiv.querySelector('h5').textContent;
        }
    });


});

// Get references to the search bar and the posts
const postSearchBar = document.getElementById('postSearchBar');
const posts = document.querySelectorAll('.post');

// Function to filter posts based on search input
const searchPosts = () => {
    const searchValue = postSearchBar.value.toLowerCase();

    posts.forEach(post => {
        const postContent = post.textContent.toLowerCase();

        if (postContent.includes(searchValue)) {
            post.style.display = 'block';
        } else {
            post.style.display = 'none';
        }
    });
}

// Listen for input in the search bar
postSearchBar.addEventListener('keyup', searchPosts);
