document.addEventListener('DOMContentLoaded', function() {
    const modals = document.querySelectorAll('.modal');

    modals.forEach(modal => {
        modal.addEventListener('show.bs.modal', function () {
            document.querySelectorAll('.to-blur').forEach(element => {
                element.classList.add('blur-background');
            });
        });

        modal.addEventListener('hidden.bs.modal', function () {
            document.querySelectorAll('.to-blur').forEach(element => {
                element.classList.remove('blur-background');
            });
        });
    });
});