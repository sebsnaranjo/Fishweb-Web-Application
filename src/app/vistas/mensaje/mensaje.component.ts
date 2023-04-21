import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'src/app/servicios/chat.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { ManagementusersService } from 'src/app/servicios/managementusers.service';
import { Message } from 'src/app/modelos/message.interface';
import { id } from '@swimlane/ngx-charts/release/utils';
import { Router, ActivatedRoute } from '@angular/router';
import { UserI } from 'src/app/modelos/user.interface';
import Swal from 'sweetalert2';
@Component({

  selector: 'app-mensaje',
  templateUrl:'./mensaje.component.html',
  styleUrls: ['./mensaje.component.css']

  
})
export class MensajeComponent implements OnInit {
  chatForm: FormGroup;
  messages: Message[] = [];
  currentUserId: UserI;
  isDropdownOpen = false;
  rol: UserI[] = [];



  constructor(
    private fb: FormBuilder,
    private chatService: MessageService,
    private userService: ManagementusersService,
  ) {}

  
 
  ngOnInit(): void {
    
    
    this.userService.getUserLoggedIn().subscribe(
      (response) => {
        this.currentUserId = response.email;
        this.chatForm.controls['from'].setValue(this.currentUserId); 
      },
      (error) => {
        console.log(error);
      }
    );
    
    this.chatForm = this.fb.group({
      from: ['', Validators.required],
      to: ['', Validators.required],
      subject: ['', Validators.required],
      message: ['', Validators.required]

      //643ce67137316489d4637bb5
    });
    
   
   
    
   

  }

  onSubmit() {

    if (!this.chatForm.value.to) {
      // Mostrar una alerta indicando que el campo es obligatorio
      Swal.fire({
        title: 'Correo invalido',
        text: 'El correo no existe',
        icon: 'warning'
      });
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // expresión regular para validar correo electrónico
    const toEmail = this.chatForm.value.to;
    
    
    if (!toEmail || toEmail.trim() === '') {
      // Mostrar una alerta indicando que el campo es obligatorio
      Swal.fire({
        title: 'Campo obligatorio',
        text: 'El campo es obligatorio',
        icon: 'warning'
      });
      return;
    }
    
    if (!emailRegex.test(toEmail)) {
      // si no es una dirección de correo electrónico válida, mostrar alerta y salir de la función
      Swal.fire({
        title: 'Dirección de correo inválida',
        text: 'Por favor, introduce una dirección de correo válida',
        icon: 'warning'
      });
      return;
    }
    if (!this.chatForm.value.to || this.chatForm.value.subject.trim() === '') {
      // Mostrar una alerta indicando que el campo es obligatorio
      Swal.fire({
        title: 'Campo obligatorio',
        text: 'El campo "Asunto" es obligatorio',
        icon: 'warning'
      });
      return;
    }
    if (!this.chatForm.value.to || this.chatForm.value.message.trim() === '') {
      // Mostrar una alerta indicando que el campo es obligatorio
      Swal.fire({
        title: 'Campo obligatorio',
        text: 'El campo "Mensaje" es obligatorio',
        icon: 'warning'
      });
      return;
    }
    
    
    
    const message: Message = {
      from: this.chatForm.value.from,
      to: this.chatForm.value.to,
      subject: this.chatForm.value.subject,
      message: this.chatForm.value.message,
      timestamp: new Date()
    };
    

    this.chatService.sendMessage(message).subscribe(() => {
      this.chatForm.reset();
      Swal.fire({
        title: '¡Mensaje Enviado!',
        text: 'Se envio el mensaje con exito',
        icon: 'success'
      });
    });

  }



}