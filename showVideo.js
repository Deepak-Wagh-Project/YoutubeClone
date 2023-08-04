const baseUrl="https://www.googleapis.com/youtube/v3";
const apiKey="AIzaSyAfzS1PNZ0xvC4QsNT_guSh1_K6adia3ZI";
const commentsContainer= document.getElementById("comments");
const videoContainer = document.getElementById("yt-video");
const videoId= localStorage.getItem("videoId");
videoContainer.src=`https://www.youtube.com/embed/${videoId}`;

async function getComments(){
  const  url= `${baseUrl}/commentThreads?key=${apiKey}&videoId=${videoId}&maxResults=80&part=snippet`;
  const response= await fetch(url,{method:"GET"});
  const data= await response.json();
  const comments= data.items;
  console.log(comments);
  renderComments(comments)
}
function renderComments(comments){
  commentsContainer.innerHTML="";
  comments.forEach((comment) => {
      commentsContainer.innerHTML+=`<div class="comment">
      <div class="image-comment">
               <img src=${comment.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="">
            </div>
           <div class="desc">
      <p class="author">${comment.snippet.topLevelComment.snippet.authorDisplayName}</p>
      <p class="text">${comment.snippet.topLevelComment.snippet.textDisplay}</p>
      </div>
  </div>`
  });
}

getComments();
