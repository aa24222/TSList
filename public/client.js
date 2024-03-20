document.addEventListener('DOMContentLoaded', function() {
    const showTodoButton = document.getElementById('showTodoList');
    const showShopButton = document.getElementById('showShopList');
    const todoList = document.getElementById('todoList');
    const shopList = document.getElementById('shopList');

    // Function to fetch and display the todo list
    function fetchTodoList() {
        fetch('/todo')
            .then(response => response.json())
            .then(data => {
                todoList.innerHTML = ''; // Clear previous list items
                data.forEach(item => {
                    const listItem = document.createElement('li');
                    listItem.textContent = item.text;
                    todoList.appendChild(listItem);
                });
                todoList.style.display = 'block'; // Show the todo list
            })
            .catch(error => console.error('Error fetching todo list:', error));
    }

    // Function to fetch and display the shop list
    function fetchShopList() {
        fetch('/shop')
            .then(response => response.json())
            .then(data => {
                shopList.innerHTML = ''; // Clear previous list items
                data.forEach(item => {
                    const listItem = document.createElement('li');
                    listItem.textContent = item.text;
                    shopList.appendChild(listItem);
                });
                shopList.style.display = 'block'; // Show the shop list
            })
            .catch(error => console.error('Error fetching shop list:', error));
    }

    // Event listener for submitting the todo form
    document.getElementById('todoForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission
        const newItem = {
            text: document.getElementById('todoItem').value,
            priority: document.getElementById('todoPriority').value,
            category: document.getElementById('todoCategory').value
        };
        fetch('/todo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newItem)
        })
        .then(response => response.text())
        .then(message => console.log(message))
        .catch(error => console.error('Error adding todo item:', error));
    });

    // Event listener for submitting the shop form
    document.getElementById('shopForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission
        const newItem = {
            text: document.getElementById('shopItem').value,
            priority: document.getElementById('shopPriority').value,
            category: document.getElementById('shopCategory').value
        };
        fetch('/shop', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newItem)
        })
        .then(response => response.text())
        .then(message => console.log(message))
        .catch(error => console.error('Error adding shop item:', error));
    });

    // Event listeners for todo and shop buttons
    showTodoButton.addEventListener('click', fetchTodoList);
    showShopButton.addEventListener('click', fetchShopList);

    // Fetch and display todo list on page load
    fetchTodoList();
});