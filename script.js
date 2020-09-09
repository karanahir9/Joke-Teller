const button = document.getElementById('button');
const audioElement = document.getElementById('audio');



// Toggle Button
function toggleButton() {
    button.disabled = !button.disabled;
};

//Passing joke to RSS function 
function tellMe(joke) {

    VoiceRSS.speech({
        key: '298acb6c9e9044a0a3d0a898494382d5',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}


//GEt Jokes from Joke Api

async function getJokes() {
    let joke = '';
    const jokeAPIUrl = 'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist';
    try {
        const response = await fetch(jokeAPIUrl);
        const data = await response.json();
        if(data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }

        // Text-to-speech
        tellMe(joke);

        // Disable Button
        toggleButton();
    } catch (error) {
console.log("whoops!", error);
    }
}

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);

