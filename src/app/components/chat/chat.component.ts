import { AfterViewChecked, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

class Message {
  text?: string;
  type: MessageType;
}

enum MessageType {
  Bot = 'bot',
  User = 'user',
  Loading = 'loading'
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('messageContainer') private messageContainer: ElementRef;
  @Input() public display: string;

  public form: FormGroup;
  public messages: Array<Message> = [];
  private canSendMessage = true;
  private conversation: Array<string> = ['Hola! Soy PoliBot, el asistente virtual de la ESPOL 🤖🐢 Estoy aquí para ayudarte en cualquier duda que tengas sobre el proceso de admisiones de la universidad. Para comenzar, quisieras tomar un breve test para conocer tus aptitudes y que carrera sería la mejor elección para ti? 😎',
    'Perfecto! Me encantará guiarte por este camino académico 😬 <br> Empecemos, dime tu nombre, edad y en que año escolar te encuentras',
    'Un gusto conocerte Adriana! <br> A continuación haré algunas preguntas y debes responder con un número del 1 al 5, donde 1 significa que no estas de acuerdo con el enunciado ❎ y 5 significa que estas totalmente de acuerdo ✅ <br> Deseas un ejemplo de respuesta o empezamos el test?' ,
    'Muy bien! <br> 1. Me gusta descubrir el mundo y las distintas formas que hay para conservarlo <br> Recuerda: 1 no estoy de acuerdo, 3 neutro, 5 totalmente de acuerdo💡',
'2. Cuando un equipo eléctrico se daña en la casa, no me da miedo intentar repararlo',
' 3. Uso herramientas tecnológicas y me gustaría  crear mis propias aplicaciones <br> Recuerda: 1 no estoy de acuerdo, 3 neutro, 5 totalmente de acuerdo 💡',
'Ya casi acabamos! <br> 4. Me fascina como chatgpt resuelve muchas tareas y siento que es el futuro',
'Perfecto!! Muchas gracias por tus respuestas 😎 <br> Según tus respuestas, tienes un perfil de innovador tecnológico 🌐 te gusta conocer como funcionan las cosas y consideras que las herramientas tecnológicas son el futuro. <br> Dicho esto, considero que las carreras que más encajan en tu perfil son las siguientes: <br> 1. Ingeniería Telemática: aprende a desarrollar dispositivos que cambian la vida de personas, casas inteligentes, negocios conectados a la nube, que la cafetera te hable? Eso no es nada. Estudia telematica y se parte del futuro de la tecnología <br> <br> 2. Ingeniería en ciencia de datos: aprende como se toman las decisiones en este mundo interconectado y a desarrollar herramientas de inteligencia artificial <br> Quieres conocer más sobre alguna de estas carreras? Preguntame sobre alguna y te daré más información. Sino te puedo seguir dando opciones',
' Claro, te puedo dar más información sobre telemática 😎 es más, tengo un video preparado para ti <br> Da click en el siguiente enlace para verlo, cuando acabes puedes regresar y preguntarme más información sobre la carrera, sobre otras opciones, o sobre el proceso de admisión'
  ]

  constructor(private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      message: ['']
    });
    this.conversation = this.conversation.reverse()
    this.getBotMessage();


  }

  ngAfterViewChecked(): void {        
    this.scrollToBottom();        
  } 

  public onClickSendMessage(): void {
    const message = this.form.get('message').value;

    if (message && this.canSendMessage) {
      const userMessage: Message = {text: message, type: MessageType.User};
      this.messages.push(userMessage);

      this.form.get('message').setValue('');
      this.form.updateValueAndValidity();
      this.getBotMessage();
    }
  }

  private getBotMessage(): void {
    this.canSendMessage = false;
    const waitMessage: Message = {type: MessageType.Loading};
    this.messages.push(waitMessage);

    setTimeout(() => {
      this.messages.pop();
      const botMessage: Message = {text: this.conversation.pop(), type: MessageType.Bot};
      this.messages.push(botMessage);
      this.canSendMessage = true;
   }, 2000);
  }

  public onClickEnter(event: KeyboardEvent): void {
    event.preventDefault();
    this.onClickSendMessage();
  }

  private scrollToBottom(): void {
    this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;         
  }
}
