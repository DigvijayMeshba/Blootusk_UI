import { Component } from '@angular/core';

@Component({
  selector: 'app-image-captcha',
  templateUrl: './image-captcha.component.html',
  styleUrls: ['./image-captcha.component.scss']
})
export class ImageCaptchaComponent {

  generatedText!: string;
  userText!: string;
  isVerified = false;

  ngOnInit(): void {
  this.generateCaptcha();
  }

  generateCaptcha() 
  {
    
    const possibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const captchaLength = 6; // Length of the generated CAPTCHA text
    let captcha = '';

    for (let i = 0; i < captchaLength; i++) {
      captcha += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
    }

    this.generatedText = captcha;
    this.isVerified = false;
  }

  capchatext : any;
  verifyCaptcha() {
    if (this.userText.toLowerCase() === this.generatedText.toLowerCase()) {

      this.capchatext ="CAPTCHA verification successful.",
      this.isVerified = true;
     

    }
     else {
      this.generateCaptcha();
      this.capchatext ="CAPTCHA verification failed."
      
    }
  }
}