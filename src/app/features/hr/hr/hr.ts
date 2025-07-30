import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hr',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hr.html',
  styleUrl: './hr.css'
})
export class Hr {
  title = 'HR';
} 