import {useState} from 'react'; 
import './App.css';
const React = require('react');
const QRCode = require('qrcode.react');
const audio = new Audio(`./audio.mp3`);

function App() {
  const [mouse, setMouse] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
  });
  const [commandStep, setCommandStep] = useState(0)
  const commands = [`python   ./sobremin.py`, `python   ./projetos.py`, `python   ./social.py`, `python   ./changeColor.py`]
  const [command, setCommand] = useState(``);
  document.body.onmousemove = function(e) {
    if(mouse.y + 120 < window.innerHeight){
      document.documentElement.style.setProperty('--x', (mouse.x) + 'px');
      document.documentElement.style.setProperty('--y', (mouse.y) + 'px');
    }
  }
  const [click, setClick] = useState(false)
  const phrase = `Hello, my name is Alexandre.. im DEV.`

  document.body.onload = () => {
    commandScreen()
  }

  const bugScreen = () => {
    document.querySelectorAll(`*`).forEach((element) => {
      element.style.filter = `hue-rotate(${Math.floor((Math.random() * 360) + 20)}deg)`
    })
  }

  const commandScreen = () => {
    let indexLetter = 0
    var index = 0
    let text = ``
    const timer = setInterval(() => {
      if(commands[index]){
        const arrayCommand = [...commands[index]]
        text += arrayCommand[indexLetter]
        indexLetter++
        indexLetter > arrayCommand.length ? (() => {
          if(index < commands.length){
            index++
            const proximo = index
            setCommandStep(proximo)
            if(index == 4){
              bugScreen()
            }
          } 
          indexLetter = 0
          text = ``
          document.querySelector(`.myWorks`).scrollTo(0, 1000000000)
          setCommand(``)
        })() : setCommand(text)
      }
    }, 300)
  }

  return (
    <div className="App" 
    onMouseDown={() => {
      setClick(true)
      audio.play()
    }}
    onMouseUp={() => {
      setClick(false)
      document.querySelectorAll(`body *`).forEach((element) => {
        element.style.filter = ``
      })
    }}
    onMouseMove={(e) => {
      setMouse({x: e.clientX, y: e.clientY})
    }}
    style={{
      filter: `${(click ? `brightness(1)` : `brightness(0.8)`)}`
    }}
    >
      <img className="background" src="./background.gif"/>
      <div style={{background: "rgba(0,0,0,.40)", position: 'fixed', width: `100%`, height: `100%`}}></div>
      <span
      style={{
        transform: `${(click ? `scale(5)` : `scale(2)`)}`
      }}
      class="cursorTwo"></span>
      <div className="welcome">
        <L>{ phrase }</L>
      </div>
      <div 
      className="myWorks panel">
        {commandStep >= 1 && <p className="textS">Eu me chamo Alexandre, tenho 22 anos, trabalho como Desenvolvedor Web.
        <br/><br/>
        <img
        style={{borderRadius: `4px`, width: `100px`, height: `100px`, objectFit: `cover`}}
        src="https://scontent.ffln3-1.fna.fbcdn.net/v/t1.6435-9/241468405_1166712717147849_3316775727587595440_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=j_XeMKK9SyEAX-AbPdY&_nc_oc=AQmGYqRLo6h4tb8o22Ll2bMQL6a-aH27a0PTdNJV7UJD_c9gNYuyQc5tTRXxxq-7ckX_vlHVry5b7KBW8REGWbzK&_nc_ht=scontent.ffln3-1.fna&oh=7a1de5eab5fa4a10e0a13285531dce7a&oe=61655227"/>
        </p>}
        {commandStep >= 2 && <p className="textS">Fiz alguns projetos, como:
        <br/>
        <iframe
        style={{borderRadius: `10px`, marginTop: `10px`, height: `300px`}}
        width="70%"  src="https://www.youtube.com/embed/qM-CSW0VUuY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        
        </p>}
        {commandStep >= 3 && 
        <>
          <div style={{display: 'inline-block',}}>
            <p className="textS">
            QR's code: <br/>  
            Facebook:
            <br/><br/>
            <QRCode value="https://facebook.com/notblank404" />
            </p>
          </div>
          <div style={{display: 'inline-block',}}>
            <p className="textS">Github:
            <br/><br/>
            <QRCode value="https://github.com/Moonlight404" />
            </p>
          </div>
          <div style={{display: 'inline-block',}}>
            <p className="textS">Linkedin:
            <br/><br/>
            <QRCode value="https://www.linkedin.com/in/alexandre-silva-97a80218b/" />
            </p>
          </div>
          ,
        </> }
        {commandStep >= 4 && 
        <>
         <p className="textS">Iniciando changeColor.py</p> 
        </> }
        <p className="username">kaway@kaway404: <span style={{color: `white`}}>{command}</span><div className="blink"></div>  </p>
      </div>
    </div>
  );
}

function L(props){
  return (
    <p>
      {props.children === ` ` ? <>&nbsp;</> : props.children}
    </p>
  )
}

export default App;
