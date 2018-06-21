import React, { Component } from 'react';
import '../CSS/default.css';

class About extends Component{
    render(){
        return(
          <React.Fragment>
          <div className="my-pic">
            <div className="my-title">
                <h1>This is About Page</h1>
                
            </div>
            <p>
                  A video game is an electronic game that involves interaction with a user interface to generate visual feedback on a video device such as a TV screen or computer monitor. The word video in video game traditionally referred to a raster display device, but as of the 2000s, it implies any type of display device that can produce two- or three-dimensional images. Some theorists categorize video games as an art form, but this designation is controversial.
                    The electronic systems used to play video games are known as platforms; examples of these are personal computers and video game consoles. These platforms range from large mainframe computers to small handheld computing devices. Specialized video games such as arcade games, in which the video game components are housed in a large, typically coin-operated chassis, while common in the 1980s in video arcades, have gradually declined due to the widespread availability of affordable home video game consoles (e.g., PlayStation 4, Xbox One and Nintendo Switch) and video games on desktop and laptop computers and smartphones.
                    The input device used for games, the game controller, varies across platforms. Common controllers include gamepads, joysticks, mouse devices, keyboards, the touchscreens of mobile devices, or even a person's body with the help of Kinect sensor. Players typically view the game on a video screen or television or computer monitor, or sometimes on virtual reality head-mounted display goggles. There are often game sound effects, music and voice actor lines which come from loudspeakers or headphones. Some games in the 2000s include haptic, vibration-creating effects, force feedback peripherals and virtual reality headsets.
                    In the 2010s, the commercial importance video game industry is of increasing. The emerging Asian markets and mobile games on smartphones in particular are driving the growth of the industry. As of 2015, video games generated sales of USD 74 billion annually worldwide, and were the third-largest segment in the U.S. entertainment market, behind broadcast and cable TV.
                </p>
          </div>
          </React.Fragment>
        );
    }
}

export default About;