import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profile: any;

  constructor(private profileService: ProfileService) {} // ตรวจสอบการตั้งค่าการ inject ตรงนี้

  ngOnInit(): void {
    const userId = 1;
    this.profileService.getProfile(userId).subscribe(
      (data) => (this.profile = data),
      (error) => console.log(error)
    );
  }
}
