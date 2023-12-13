import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-my-textfield',
    templateUrl: './my-textfield.component.html',
    styleUrls: ['./my-textfield.component.css']
})

export class MyTextfieldComponent {
    @Input() iconInput: string = '';
    @Input() label: string = '';
    @Input() type: string = '';
    @Input() placeholder: string = '';
    @Input() pattern: string = '';
    @Input() errorMessage: string = '';
    @Input() control: FormControl;

    constructor() {
        this.control = new FormControl('', Validators.required);
        if (this.pattern) {
            this.control.setValidators([Validators.pattern(this.pattern)]);
        }
    }

    isInvalid(): boolean {
        return this.control.invalid && this.control.touched;
    }
}