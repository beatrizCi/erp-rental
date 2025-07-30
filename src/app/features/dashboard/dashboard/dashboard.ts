import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Card } from "../../../shared/components/card/card";

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, Card],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements AfterViewInit {
  @ViewChild('videoElement', { static: true }) videoElement!: ElementRef<HTMLVideoElement>;

  onVideoLoaded(event: Event) {
    const video = event.target as HTMLVideoElement;
    this.ensureVideoPlays(video);
  }

  onVideoEnded(event: Event) {
    const video = event.target as HTMLVideoElement;
    // Ensure the video restarts immediately
    video.currentTime = 0;
    this.ensureVideoPlays(video);
  }

  private ensureVideoPlays(video: HTMLVideoElement) {
    // Ensure video is muted for autoplay
    video.muted = true;
    video.volume = 0;
    
    // Try to play with multiple attempts
    const playVideo = async () => {
      try {
        await video.play();
      } catch (error) {
        console.log('Video autoplay failed, retrying...', error);
        // Retry after a short delay
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
    // Ensure video starts playing and loops continuously
    if (this.videoElement) {
      const video = this.videoElement.nativeElement;
      
      // Set all required properties for autoplay
      video.loop = true;
      video.muted = true;
      video.volume = 0;
      video.autoplay = true;
      video.playsInline = true;
      video.preload = 'auto';
      
      // Add event listeners for better control
      video.addEventListener('pause', () => {
        // If video gets paused, restart it
        video.currentTime = 0;
        this.ensureVideoPlays(video);
      });

      video.addEventListener('ended', () => {
        // When video ends, restart immediately
        video.currentTime = 0;
        this.ensureVideoPlays(video);
      });

      // Force play on component initialization
      this.ensureVideoPlays(video);
    }
  }
}
