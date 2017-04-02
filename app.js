let p = null

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia


function bindEvents(p){
  p.on('error', function(err){
    console.log(err)
  })


  p.on('signal', function(data){
    debugger
    document.querySelector("#offer").textContent = JSON.stringify(data)
  })


  p.on('stream', function(stream){
    let video = document.querySelector('#receiver-video')
    //debugger
    video.src = window.URL.createObjectURL(stream)
    console.log(video)
    video.play()
  })

}



//Initialization
document.querySelector('#start').addEventListener('click', function(e){

  navigator.getUserMedia({
    video: true,
    audio: true
  }, function(stream){
    p = new SimplePeer({
      initiator: true,
      stream: stream,
      trickle: false
      //config: {}
    })
    bindEvents(p)

    let emitterVideo = document.querySelector('#emitter-video')
    debugger
    emitterVideo.src = window.URL.createObjectURL(stream)
    console.log(emitterVideo)
    emitterVideo.play()

  }, function(){})



})


document.querySelector('#incomming').addEventListener('submit', function(e){
  e.preventDefault()
  if(p == null){
    p = new SimplePeer({
      initiator: false,
      trickle: false
    })
    bindEvents(p)
  }

  p.signal(JSON.parse(e.target.querySelector('textarea').value))
})
