import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from "../../../shared/components/card/card";

@Component({
  selector: 'app-crm',
  standalone: true,
  imports: [CommonModule, Card],
  templateUrl: './crm.html',
  styleUrl: './crm.css'
})
export class Crm implements AfterViewInit {
  @ViewChild('videoElement', { static: true }) videoElement!: ElementRef<HTMLVideoElement>;

  onVideoLoaded(event: Event) {
    const video = event.target as HTMLVideoElement;
    this.ensureVideoPlays(video);
  }

  onVideoEnded(event: Event) {
    const video = event.target as HTMLVideoElement;
    video.currentTime = 0;
    this.ensureVideoPlays(video);
  }

  private ensureVideoPlays(video: HTMLVideoElement) {
    video.muted = true;
    video.volume = 0;
    
    const playVideo = async () => {
      try {
        await video.play();
      } catch (error) {
        console.log('Video autoplay failed, retrying...', error);
        setTimeout(() => {
          video.muted = true;
          video.volume = 0;
          video.play().catch(e => console.log('Retry failed:', e));
        }, 100);
      }
    };

    playVideo();
  }

  ngAfterViewInit() {
    if (this.videoElement) {
      const video = this.videoElement.nativeElement;
      
      video.loop = true;
      video.muted = true;
      video.volume = 0;
      video.autoplay = true;
      video.playsInline = true;
      video.preload = 'auto';
      
      video.addEventListener('pause', () => {
        video.currentTime = 0;
        this.ensureVideoPlays(video);
      });

      video.addEventListener('ended', () => {
        video.currentTime = 0;
        this.ensureVideoPlays(video);
      });

      this.ensureVideoPlays(video);
    }
  }
} 