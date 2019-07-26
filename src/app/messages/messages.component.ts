import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  constructor(
    public messageService: MessageService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {}

  openSnackBar(message: string) {
    this.snackBar.open(message, 'close');
  }
}
