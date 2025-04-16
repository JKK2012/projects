document.addEventListener('DOMContentLoaded', () => {
    const questions = document.querySelectorAll('h4');
    
    questions.forEach((question) => {
        const answer = question.nextElementSibling;
        answer.style.display = 'underline';
        
        question.style.cursor = 'pointer';
        question.addEventListener('click', () => {
            answer.style.display = answer.style.display === 'none' ? 'block' : 'none';
        });
    });
});

    