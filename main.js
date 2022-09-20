const timebox = document.querySelector('#timmer_box')

// Finding Timer Location
const setTimerLocation = (parrent, element, beforeItem) => {
  const target = document.querySelectorAll(`${parrent} ${element}`)[beforeItem - 1]
  const content = document.querySelector(parrent)
  const timmerContainer = document.createElement("div")
  const timmerBox = `
    <div id="timmer_box" style="display: block; width: 300px; height: 250px; border: 1px solid black; margin: 0 auto; display: grid; justify-content: center; align-content: center; font-family: monospace; font-size: 40px;">00:00</div>`
  timmerContainer.innerHTML = timmerBox;
  content.insertBefore(timmerContainer, target)
}

// Convert Second to MM:SS
const convertDisplayTime = seconds => {
  let minutes = Math.floor(seconds / 60)
  let extraSeconds = seconds % 60
  minutes = minutes < 10 ? "0" + minutes : minutes
  extraSeconds = extraSeconds < 10 ? "0" + extraSeconds : extraSeconds

  return minutes + ':' + extraSeconds
}

const displayDateTimeCondition = (count, i) => {
  const date = new Date().toISOString().slice(0, 10)
  const dateFormat = date.replaceAll("-", ":")
  if (i === 3) {
    return dateFormat
  } else {
    return convertDisplayTime(count)
  }
}

// Counting Method
let count = 0
let timer = null
const startTimer = (timebox, i) => {
  if (timer !== null) return
  timer = setInterval(function () {
    count++
    timebox.textContent = displayDateTimeCondition(count , i)
  }, 1000)
}
const stopTimer = (timebox, i) => {
  clearInterval(timer)
  timer = null
  timebox.textContent = displayDateTimeCondition(count , i)
}

let i = 0
const observer = new IntersectionObserver(function (entries) {
  const timebox = document.querySelector('#timmer_box')
  if (entries[0].isIntersecting) { 
    i++
    timebox.style.backgroundColor = "black"
    timebox.style.color = "white"
    startTimer(timebox, i)
  } else {
    timebox.style.backgroundColor = "white"
    timebox.style.color = "black"
    stopTimer(timebox, i)
    if (i == 3) {
      i = 0
    }
  }
}, { threshold: [0.5] })

setTimerLocation('#content', 'p', 36)
observer.observe(document.querySelector("#timmer_box"))


