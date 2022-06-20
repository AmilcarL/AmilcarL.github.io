let daysLeft = 0;
const startTime = new Date('February 1, 2022 08:00:00').getTime();
const targetTime = new Date('June 30, 2022 16:00:00').getTime();
const totalTime = targetTime - startTime;
let fancyTotalTime = totalTime;
let speed = 500;
let fancyStartDone = false;

// Fancy start
const fancyStart = () => {

    const now = new Date().getTime();

    const remainingTime = targetTime - now;
    const timeGone = now - startTime;

    // Time is hard
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    if (fancyTotalTime > remainingTime) {
        fancyTotalTime = fancyTotalTime * 0.95;

        textDay = Math.floor(fancyTotalTime / day)
        textHour = Math.floor((fancyTotalTime % day) / hour)
        textMinute = Math.floor((fancyTotalTime % hour) / minute)
        textSecond = Math.floor((fancyTotalTime % minute) / second)

        document.querySelector(".day").innerText = textDay;
        document.querySelector(".hour").innerText = textHour;
        document.querySelector(".minute").innerText = textMinute;
        document.querySelector(".second").innerText = textSecond;

        pictureChange(fancyTotalTime / day)

        setTimeout(fancyStart, speed);

    } else {
        fancyStartDone = true;
        setInterval(calculateTime, 1000);
    }

}

// Calculate time
const calculateTime = () => {

    const startTime = new Date('February 1, 2022 08:00:00').getTime();
    // Was 28., but now 29. And now 30th.
    const targetTime = new Date('June 30, 2022 16:00:00').getTime();
    const now = new Date().getTime();

    const totalTime = targetTime - startTime;
    const remainingTime = targetTime - now;
    const timeGone = now - startTime;

    // Time is hard
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Calculate time left
    const timeText = {
        textDay: Math.floor(remainingTime / day),
        textHour: Math.floor((remainingTime % day) / hour),
        textMinute: Math.floor((remainingTime % hour) / minute),
        textSecond: Math.floor((remainingTime % minute) / second),
    }

    // Calculate time gone
    const timeTextGone = {
        textDayGone: Math.floor(timeGone / day),
        textHourGone: Math.floor((timeGone % day) / hour),
        textMinuteGone: Math.floor((timeGone % hour) / minute),
        textSecondGone: Math.floor((timeGone % minute) / second),
    }

    // Calculate total time
    const textTotalTime = {
        totalDay: Math.floor(totalTime / day),
        totalHour: Math.floor((totalTime % day) / hour),
        totalMinute: Math.floor((totalTime % hour) / minute),
        totalSecond: Math.floor((totalTime % minute) / second),
    }
    if (fancyStartDone) {
        if (daysLeft != timeText.textDay) {
            console.log(daysLeft, 'days left', timeText.textDay, 'timetexttextday')
            daysLeft = timeText.textDay
            pictureChange(timeText.textDay)
            videoCalculator(textTotalTime.totalDay, timeTextGone.textDayGone);
        }

    }
    insertTimeText(timeText, timeTextGone)
}

// Insert text into countdown
const insertTimeText = (timeText, timeTextGone) => {
    // Insert correct time left into document
    document.querySelector(".day").innerText = timeText.textDay;
    document.querySelector(".hour").innerText = timeText.textHour;
    document.querySelector(".minute").innerText = timeText.textMinute;
    document.querySelector(".second").innerText = timeText.textSecond;

    // Insert time gone into document
    document.querySelector("#day-gone").innerText = timeTextGone.textDayGone;
    document.querySelector("#hour-gone").innerText = timeTextGone.textHourGone;
    document.querySelector("#minute-gone").innerText = timeTextGone.textMinuteGone;
    document.querySelector("#second-gone").innerText = timeTextGone.textSecondGone;
}

// Change picture as days decrease
const pictureChange = textDay => {

    // Change picture depending on days left
    switch (true) {
        case (textDay <= 6): {
            document.getElementById("vinceImg").src = "./images/5-1.png";
            break;
        }
        case (textDay <= 41): {
            document.getElementById("vinceImg").src = "./images/30-6.png";
            break;
        }
        case (textDay <= 76): {
            document.getElementById("vinceImg").src = "./images/55-31.png";
            break;
        }
        case (textDay <= 111): {
            document.getElementById("vinceImg").src = "./images/80-56.png";
            break;
        }
        default: {
            //document.getElementById("vinceImg").src = "./images/100-81.png";
            break;
        }
    }

}

// Calculates how much of the video should be played
const videoCalculator = (totalDay, textDayGone) => {
    // src="https://www.youtube.com/embed/trELKmUPoyU?start=0&end=10&playlist=trELKmUPoyU&loop=1&amp;showinfo=0"
    // src="https://www.youtube.com/embed/trELKmUPoyU?start=0&end=10&playlist=trELKmUPoyU&loop=1"
    // this loops the video, but can't control the length on the loop

    // Video is 13 seconds long. Way to get duration automatically? Looks like you have to make a youtube API call for it
    // time passed / total time * 100
    // 13 seconds * percentageGone = endTime
    const videoPlayTimeSeconds = 13
    const partGone = textDayGone / totalDay
    const howManySecondsToPlay = Math.round(videoPlayTimeSeconds * partGone)

    // Could also be done with search()?
    // Embed link split up into parts
    const videoLink = {
        youtube: "https://www.youtube.com/embed/",
        videoId: "trELKmUPoyU",
        startText: "?start=",
        startTime: "0",
        endText: "&end=",
        endTime: howManySecondsToPlay.toString(),
    }

    videoLinkBuilder(videoLink)
}

// Assembles the link and inserts it into the document
const videoLinkBuilder = videoLink => {
    const youtubeLink = videoLink.youtube + videoLink.videoId + videoLink.startText + videoLink.startTime + videoLink.endText + videoLink.endTime

    document.getElementById("video").src = youtubeLink
}

fancyStart();
// Repeat every second
//setInterval(calculateTime, 1000);