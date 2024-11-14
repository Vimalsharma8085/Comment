// script.js

// Select necessary DOM elements
const addCommentBtn = document.getElementById('addCommentBtn');
const newCommentInput = document.getElementById('newComment');
const commentSection = document.getElementById('commentSection');

// Add comment functionality
addCommentBtn.addEventListener('click', function() {
    const commentText = newCommentInput.value.trim();
    if (commentText === '') return; // Don't add empty comments

    const commentElement = createCommentElement(commentText);
    commentSection.appendChild(commentElement);

    // Clear input field
    newCommentInput.value = '';
});

// Create comment element
function createCommentElement(text) {
    const commentDiv = document.createElement('div');
    commentDiv.classList.add('comment');
    
    // Comment content
    const commentContent = document.createElement('div');
    commentContent.classList.add('flex', 'justify-between', 'items-start');
    
    const commentText = document.createElement('p');
    commentText.textContent = text;
    commentText.classList.add('text-gray-800', 'text-sm');
    
    commentContent.appendChild(commentText);

    // Add "Reply" button
    const replyBtn = document.createElement('button');
    replyBtn.textContent = 'Reply';
    replyBtn.classList.add('ml-4', 'text-blue-500', 'text-xs', 'hover:underline');
    replyBtn.addEventListener('click', function() {
        createReplyForm(commentDiv);
    });

    // Add "Edit" button
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.classList.add('ml-2', 'text-yellow-500', 'text-xs', 'hover:underline');
    editBtn.addEventListener('click', function() {
        editComment(commentDiv, commentText);
    });

    // Add "Delete" button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('ml-2', 'text-red-500', 'text-xs', 'hover:underline');
    deleteBtn.addEventListener('click', function() {
        deleteComment(commentDiv);
    });

    // Append buttons to comment content
    commentContent.appendChild(replyBtn);
    commentContent.appendChild(editBtn);
    commentContent.appendChild(deleteBtn);
    commentDiv.appendChild(commentContent);
    
    return commentDiv;
}

// Delete comment functionality
function deleteComment(commentDiv) {
    // Remove the commentDiv from the comment section
    commentSection.removeChild(commentDiv);
}

function editComment(commentDiv, commentText) {
    
    const textArea = document.createElement('textarea');
    textArea.classList.add('w-full', 'p-2', 'border', 'border-gray-300', 'rounded-md', 'text-sm');
    textArea.value = commentText.textContent; // Pre-fill the textarea with current text

    
    commentDiv.replaceChild(textArea, commentText);

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.classList.add('mt-2', 'px-4', 'py-2', 'bg-green-500', 'text-white', 'rounded-md', 'text-sm');
    saveButton.addEventListener('click', function() {
        const updatedText = textArea.value.trim();
        if (updatedText === '') return; 
        
        const updatedCommentText = document.createElement('p');
        updatedCommentText.textContent = updatedText;
        updatedCommentText.classList.add('text-gray-800', 'text-sm');

        
        commentDiv.replaceChild(updatedCommentText, textArea);

        
        commentDiv.removeChild(saveButton);
    });

    
    commentDiv.appendChild(saveButton);
}

function createReplyForm(commentDiv) {
    const replyForm = document.createElement('div');
    replyForm.classList.add('reply', 'mt-4');
    
    const replyTextarea = document.createElement('textarea');
    replyTextarea.classList.add('w-full', 'p-2', 'border', 'border-gray-300', 'rounded-md', 'text-sm');
    replyTextarea.placeholder = 'Add a reply...';
    replyForm.appendChild(replyTextarea);

    const replyButton = document.createElement('button');
    replyButton.textContent = 'Submit Reply';
    replyButton.classList.add('mt-2', 'px-4', 'py-2', 'bg-blue-500', 'text-white', 'rounded-md', 'text-sm');
    replyButton.addEventListener('click', function() {
        const replyText = replyTextarea.value.trim();
        if (replyText === '') return;

        const replyElement = createCommentElement(replyText);
        commentDiv.appendChild(replyElement);

        commentDiv.removeChild(replyForm);
    });
    replyForm.appendChild(replyButton);

    commentDiv.appendChild(replyForm);
}
