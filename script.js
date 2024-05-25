//your code here
document.addEventListener('DOMContentLoaded', () => {
    const userNameElement = document.getElementById('user-name');
    const userPhotoElement = document.getElementById('user-photo');
    const infoElement = document.getElementById('info');
    const getUserButton = document.getElementById('getUser');
    const buttons = document.querySelectorAll('.buttons button');

    let currentUser = {};

    async function fetchUser() {
        try {
            const response = await fetch('https://randomuser.me/api/');
            const data = await response.json();
            const user = data.results[0];
            currentUser = {
                name: `${user.name.first} ${user.name.last}`,
                photo: user.picture.large,
                age: user.dob.age,
                email: user.email,
                phone: user.phone
            };
            updateUserInfo();
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    }

    function updateUserInfo() {
        userNameElement.textContent = currentUser.name;
        userPhotoElement.src = currentUser.photo;
        infoElement.textContent = '';
    }

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const attribute = button.getAttribute('data-attr');
            infoElement.textContent = currentUser[attribute];
        });
    });

    getUserButton.addEventListener('click', fetchUser);

    // Fetch initial user
    fetchUser();
});
