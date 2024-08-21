const username = localStorage.getItem('loggedInUser');

function addComment() {
    const commentInput = document.getElementById('commentInput');
    const ratingInput = document.getElementById('ratingInput');
    const commentText = commentInput.value;
    const ratingValue = ratingInput.value;


    if (commentText.trim() === "") return;

    const commentId = new Date().getTime();
    const comment = { id: commentId, text: commentText, rating: ratingValue };

    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.push(comment);
    localStorage.setItem('comments', JSON.stringify(comments));

    commentInput.value = "";
    ratingInput.value = "1";
}

document.addEventListener('DOMContentLoaded', loadComments);

function loadComments() {
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.forEach(comment => {
        addCommentToDOM(comment.id, comment.text, comment.rating);
    });
}

function addCommentToDOM(commentId, commentText, ratingValue) {
    const commentHTML = `
        <div id="comment-${commentId}" class="comment">
            <div class="star">
                ${'<i class="icon-star">⭐</i>'.repeat(ratingValue)}

            </div>
            <p>${commentText}</p>
            <div class="user">
                <img src="../img/customer-1.jpg" alt="">
                <div class="user-info">
                    <h3>${username}</h3>
                    <span>Happy Customer</span>
                </div>
            </div>
            <div class="comment-actions">
                <button class="edit-button" onclick="editComment(${commentId})">Edit</button>
                <button class="delete-button" onclick="deleteComment(${commentId})">Delete</button>
            </div>
        </div>
    `;
    document.getElementById('commentsContainer').insertAdjacentHTML('beforeend', commentHTML);
}

function editComment(commentId) {
    const commentDiv = document.getElementById(`comment-${commentId}`);
    const commentText = commentDiv.querySelector('p').innerText;
    const starElements = commentDiv.querySelectorAll('.star .icon-star:not(.empty-star)');
    const ratingValue = starElements.length;

    const newCommentText = prompt("Edit your comment:", commentText);
    const newRatingValue = prompt("Edit your rating (1-5):", ratingValue);

    if (newCommentText !== null && newCommentText.trim() !== "" && newRatingValue >= 1 && newRatingValue <= 5) {
        commentDiv.querySelector('p').innerText = newCommentText;
        commentDiv.querySelector('.star').innerHTML = 
            `${'<i class="icon-star">⭐</i>'.repeat(newRatingValue)}`;
        
        const comments = JSON.parse(localStorage.getItem('comments')) || [];
        const commentIndex = comments.findIndex(comment => comment.id === commentId);
        if (commentIndex !== -1) {
            comments[commentIndex].text = newCommentText;
            comments[commentIndex].rating = newRatingValue;
            localStorage.setItem('comments', JSON.stringify(comments));
        }
    }
}

function deleteComment(commentId) {
    const commentDiv = document.getElementById(`comment-${commentId}`);
    commentDiv.remove();

    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    const updatedComments = comments.filter(comment => comment.id !== commentId);
    localStorage.setItem('comments', JSON.stringify(updatedComments));
}
