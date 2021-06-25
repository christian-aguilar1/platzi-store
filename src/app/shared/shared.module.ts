import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ExponentialPipe } from './pipes/exponential/exponential.pipe';
import { HighlightDirective } from './directives/highlight/highlight.directive';
import { MaterialModule } from '../material/material.module';
import { CartComponent } from './components/cart/cart.component';
import { CartPipe } from './pipes/cart/cart.pipe';
import { DeleteRepeatsPipe } from './pipes/delete-repeats/delete-repeats.pipe';
import { RepeatNumberPipe } from './pipes/repeat-number/repeat-number.pipe';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ExponentialPipe,
    HighlightDirective,
    CartComponent,
    CartPipe,
    DeleteRepeatsPipe,
    RepeatNumberPipe
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ExponentialPipe,
    HighlightDirective,
    CartPipe,
    DeleteRepeatsPipe,
    RepeatNumberPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
