const baseUrl="https://www.googleapis.com/youtube/v3";
const apiKey="AIzaSyDBbJuCnm3XgeOaVYIPo8DKTxGoiI0kWYU";
const q="CodeWithHarry"
let  container =document.getElementById("video-container");

async function getVideos(q){
 const url =`${baseUrl}/search?key=${apiKey}&part=snippet&q=${q}&type=videos&maxResults=20`;
 const response= await fetch(url,{ method:"GET"});
 const data = await response.json();
 console.log(data);
 let videos= data.items;
 getVideosData(videos);
}

async function getVideosData(videos){
    let videoData=[];
    for(let i=0;i<videos.length;i++){
        const video=videos[i]
        const videoId=video.id.videoId
         videoData.push(await getVideosDetails(videoId));
    }
    renderData(videos);
}

 async function getVideosDetails(video_ID){
    const url =`${baseUrl}/videos?key=${apiKey}&id=${video_ID}&part=snippet,contentDetails,statistics`;
    const response= await fetch(url,{ method:"GET"});
    const data = await response.json();
    return data.items[0];
}

function renderData(videos){
    console.log(videos);
    container.innerHTML=``;
      for(let i=0;i<videos.length;i++){
        const video=videos[i];
        const title= video.snippet.title;
        const channelName=video.snippet.channelTitle;
        const thumbnail = video.snippet.thumbnails.high.url;
        container.innerHTML+=`
        <div class="video-info-container">
        <div class="video-Info" onclick="openVideoDetails('${video.id}')">
        <div class="video-Image">
                        <img src="${thumbnail}" alt="image" width="100%" height="100%">
        </div>
        <div class="video-Descreption">
           
            <div class="video-title">
                 ${title}
            </div>
            <div class="channel-descreption">
                 <p class="channel-name">${channelName}</p>
                 
            </div>
        </div>
    </div>
    </div>`
      }
}

function openVideoDetails(videoId){
    localStorage.setItem("videoId",videoId);
    window.open("videoDetails.html");
}
getVideos("");
//getVideosDetails("");
